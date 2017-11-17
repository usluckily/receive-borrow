<template>
  <transition name="page">
    <div class="all" style="z-index:1">

      <r_mind :show="remind.show" v-if="remind.show"></r_mind>

      <my_modal :parentModal="modal"></my_modal>
      <g_bg :parentModal="modal"></g_bg>

      <fl_box :list="searchList.list" :top="searchList.top" :target="searchList.target"></fl_box>

      <div class="con-box">
        <div class="item">
          <div>
            部门/班级: <input placeholder="请输入申请部门或班级*" v-model="deptOrClass.val" @input="search('deptOrClass',$event)" @compositionstart="compositionstart" @compositionend="compositionend"/>
          </div>
          <div>
            <img src="../../assets/img/icon/icon_audio@2x.png" class="icon"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item">
          <div>
            物品种类 : <input placeholder="请输入物品种类*" v-model="itemType.val"  @focus="getItemType('itemType',$event)" /><!--@input="search('itemType',$event)"-->
          </div>
          <div>
            <img src="../../assets/img/icon/icon_audio@2x.png" class="icon"/>
          </div>
        </div>
        <div class="item">
          <div>
            物品名称 : <input placeholder="请输入物品名称*" v-model="itemName.val" @input="search('itemName',$event)" @compositionstart="compositionstart" @compositionend="compositionend"/>
          </div>
          <div>
            <img src="../../assets/img/icon/icon_audio@2x.png" class="icon"/>
          </div>
        </div>

        <div class="item">
          <div>
            申请数量 :
            <input placeholder="1" v-model="applyNum" @blur="numValidate(applyNum)"/>
          </div>
          <div>
            <img src="../../assets/img/icon/icon_audio@2x.png" class="icon"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item"style="display:block">
          <div>
            <span class="speSpan">领用原因 : </span><textarea placeholder="请输入申请原因..." v-model="applyReason"  class="speTextarea" />
          </div>
          <div>
            <img src="../../assets/img/icon/icon_audio@2x.png" class="icon"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item">
          <div>
            第一级审批人 :
            <input placeholder="请选择第一级审批人" readonly v-model="firstApprover.val" @click="setApprover"/>
          </div>
        </div>

        <div class="item">
          <div>
            审 &nbsp;批 &nbsp;人 :
            <!--<input placeholder="" readonly v-model="approveman"/>-->
            <span> {{ approveman }} </span>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item">
          <div>
            发 &nbsp;放 &nbsp;人 :
            <!--<input placeholder="" readonly v-model="itemman"/>-->
            <span> {{ itemman }} </span>
          </div>
        </div>
      </div>

      <f_btn style="position:relative;">
        <div @click="sub" class="fbtn">{{ btnText }}</div>
      </f_btn>

    </div>
  </transition>
</template>
<script>
  import fbtn from '@/components/common/footerbtn'
  import flbox from '@/components/common/floatlistbox'
  import remind from '@/components/common/remind'
  import modal from '@/components/common/modal'
  import gbg from '@/components/common/ghostbg'

  import $ from 'jquery'
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'
//  import B from '@/assets/js/simulationBaseInfo'
  import config from '@/assets/js/config'


    export default({
      name: 'rapply',
      data(){
        return {
          inputLock:true,
          inputCn:false,
          post:true,
          modal:{
            that:this,//指向本组件Vue
            show:false,
            content:'',
            bookId:'',
            ctrState:'0',
            bookObj:'',
            callback () {
              let _this = this
              _this.show = false
            }
          },
          basic:{},
          remind:{
            show:false
          },
          searchList:{
            top:'',
            target:'',
            list:[]
          },
          btnText:'提交',
          deptOrClass:{
            val:'',
            classid:'',
            deptid:''
          },
          itemType:{
            val:'',
            id:''
          },
          itemName:{
            val:'',
            id:''
          },
          applyNum:1,
          applyReason:'',
          itemman:'',
          approveman:'',
          firstApprover:{
            val:'',
            id:''
          }
        }
      },
      created(){
        let vm = this ,B = vm.$store.state.BP,
          pObj = {
//            url:IF.getBase,
            userid:B.userid,
            sid:B.sid
          }
        ajax.post(IF.getBase,pObj,function(d){
          vm.basic = d
        },['name','classname','deptname'])

        vm.$root.eventHub.$on('remindShow',function(d){
          vm.remind.show = d
        })

      },
      mounted(){
        let vm = this
        $('.icon').click(function(){
          vm.remind.show = true
        })
      },
      methods:{
        sub(){
          let vm = this , B = vm.$store.state.BP

          let pObj = {
//            url:IF.addData,
            userid:B.userid,
            sid:B.sid,
            classid:vm.deptOrClass.classid,//@#
            deptid:vm.deptOrClass.deptid,//@#
            itemtypeid:vm.itemType.id,//@#
            itemtnum:vm.applyNum,
            goodsmanagementid:vm.itemName.id,//@#
            approver:vm.firstApprover.id,
            itemname:vm.itemName.val,
            note:vm.applyReason,
            type:config.obj.type
          }

          if(vm.itemName.val && vm.itemType.val && vm.deptOrClass.val){
            ajax.post(IF.addData,pObj,function(d){
              vm.$router.replace({path:'/receive'})
            })
          }else{
            vm.modal.content = '必填信息未填写'
            vm.modal.show = true
          }

        },
        search(type,el){
          let vm = this ,pObj = {} , B = vm.$store.state.BP , pUrl

          vm.$root.eventHub.$off('setInfo')

            switch(type){
              case 'deptOrClass':
                pUrl = IF.searchDandC
                pObj = {
//                  url:IF.searchDandC,
                  userid:B.userid,
                  sid:B.sid,
                  type:config.obj.type,
                  name:encodeURI(vm.deptOrClass.val.toUpperCase())
                }
                break;
              case 'itemType':
                pUrl = IF.searchItemType
                pObj = {
//                  url:IF.searchItemType,
                  userid:B.userid,
                  sid:B.sid,
                  type:config.obj.type,
                  itemtypename:encodeURI(vm.itemType.val.toUpperCase())
                }
                break;
              case 'itemName':
                pUrl = IF.fuzzyQuery
                pObj = {
//                  url:IF.fuzzyQuery,
                  userid:B.userid,
                  sid:B.sid,
                  type:config.obj.type,
                  itemtypeid:20,
                  itemname:encodeURI(vm.itemName.val.toUpperCase())
                }
                break;
            }

          vm.searchList.top = ( $(el.target).offset().top + $('.all').scrollTop() )
          vm.searchList.target = el

          if(vm[type].val.length <= 0){
            vm.searchList.list = []
          }

          if( vm[type].val.length > 0 && vm.post){  //( !vm.inputLock || !vm.inputCn ) &&
            vm.post = false
            vm.inputLock = true
            ajax.post(pUrl,pObj,function(d){
              vm.searchList.list = d.data
              vm.post = true

              //
              vm.$root.eventHub.$on('setInfo',function(d){
                if(d.type){
                  d.type == '1' ? vm.deptOrClass.classid = d.id : vm.deptOrClass.deptid = d.id
                }
                vm[type].val = d.val
                vm[type].id = d.id
                vm.searchList.list = []
              })
              //

            },['name','itemman'])
          }
        },
        getItemType(type,el){
          let vm = this , B = vm.$store.state.BP
          vm.searchList.top = ( $(el.target).offset().top + $('.all').scrollTop() )
          vm.searchList.target = el

          vm.$root.eventHub.$off('setInfo')

          ajax.post(IF.getBase,{sid:B.sid,userid:B.userid},function(d){

            vm.searchList.list = d.itemtypedata
            vm.approveman = d.approveitemnames

            vm.$root.eventHub.$on('setInfo',function(d){
              if(d.type){
                d.type == '1' ? vm.deptOrClass.classid = d.id : vm.deptOrClass.deptid = d.id
              }
              vm[type].val = d.val
              vm[type].id = d.id
              vm.searchList.list = []
              vm.itemman = d.itemman
            })

          },['name','classname','deptname','itemman','approveitemnames','approveborrownames'])
        },
        setApprover(el){
          let vm = this
          vm.searchList.top = ( $(el.target).offset().top + $('.all').scrollTop() )
          vm.searchList.target = el
          vm.searchList.list = vm.basic.firstapprover

          vm.$root.eventHub.$off('setInfo')
          vm.$root.eventHub.$on('setInfo',function(d){
            vm.firstApprover.val = d.val
            vm.firstApprover.id = d.id
            vm.searchList.list = []
          })
        },
        numValidate(val){
          if(val<1 || isNaN(val)){
            this.applyNum = '1'
          }else{
            this.applyNum = parseInt(this.applyNum)
          }
        },
        compositionstart(){
          this.inputLock = true
          this.inputCn = true
        },
        compositionend(){
          this.inputLock = false
          this.inputCn = false
        }
      },
      components:{
        f_btn:fbtn,
        fl_box:flbox,
        r_mind:remind,
        my_modal:modal,
        g_bg:gbg
      }
    })
</script>
<style>

</style>
