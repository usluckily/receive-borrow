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
            申请部门 : <input placeholder="请输入申请部门或班级*"
                          v-model="deptOrClass.val"
                          @input="search('deptOrClass',$event)"
                          @compositionstart="compositionstart"
                          @compositionend="compositionend"
          />
            <!--@click="a_dText($event,'deptOrClass')"-->

          </div>
          <div>
            <img src="../../../assets/img/icon/icon_audio@2x.png" class="icon" @click="test"/>
          </div>
        </div>

        <div class="item">
          <div v-if=" scenario != '003' ">
            申请场地: <input placeholder="请输入场地名称"
                          v-model="itemName.val"
                          @input="search('itemName',$event)"
                          @compositionstart="compositionstart"
                          @compositionend="compositionend"
          />
            <!--@click="a_dText($event,'itemName')"-->

          </div>
          <div>
            <img src="../../../assets/img/icon/icon_audio@2x.png" class="icon" @click="test"/>
          </div>
        </div>

        <div class="item">
          <div>
            申请数量 : <input placeholder="1" v-model="applyNum" @blur="numValidate(applyNum)"/>
          </div>
          <div>
            <img src="../../../assets/img/icon/icon_audio@2x.png" class="icon" @click="test"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item">
          <div>
            借用日期 : <input placeholder="借用日期*" v-model="pageborrowtime"  id="startdate"/>
          </div>
          <div>
            <img src="../../../assets/img/arrows2.png" class="icon"/>
          </div>
        </div>
        <div class="item">
          <div>
            归还日期 : <input placeholder="归还日期*" v-model="pagereturntime"   id="enddate"/>
          </div>
          <div>
            <img src="../../../assets/img/arrows2.png" class="icon"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item" style="display: block;">
            <span class="speSpan">借用原因 :</span> <textarea placeholder="请输入申请原因..." v-model="applyReason" class="speTextarea" />
          <div>
            <img src="../../../assets/img/icon/icon_audio@2x.png" class="icon" @click="test"/>
          </div>
        </div>
        </div>

      <div class="con-box">

        <!--<div class="item">-->
          <!--<div>-->
            <!--第一级审批人 :-->
            <!--<input placeholder="选择第一级审批人*" readonly v-model="firstApprover.val" @click="setApprover" />-->
          <!--</div>-->
        <!--</div>-->

        <div class="item">
          <div>
            审 &nbsp;批 &nbsp;人 :
            <!--<input placeholder="" v-model="approveman" readonly/> -->
            <span> {{ approveman }} </span>
            </textarea>
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
  import base from '@/assets/js/base'
//

  require('@/assets/js/mobiscroll.js')


  export default({
    name: 'bapply',
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
        pagereturntime:'',
        pageborrowtime:'',
        applyNum:1,
        applyReason:'',
        itemman:'',
        firstApprover:{
          val:'',
          id:''
        },
        approveman:localStorage.approveborrownames,
        borrowType:JSON.parse(localStorage.borrowType),
        scenario:JSON.parse(localStorage.borrowType).scenario
      }
    },
    computed:{

    },
    created(){
      let vm = this ,B = vm.$store.state.BP,
        pObj = {
//          url:IF.getBase,
          userid:B.userid,
          sid:B.sid
        }

      ajax.post(IF.getBase,pObj,function(d){
        vm.basic = d
      },['name','classname','deptname'])

      vm.itemman = vm.borrowType.itemman

      vm.$root.eventHub.$on('remindShow',function(d){
        vm.remind.show = d
      })
    },
    mounted(){
      alert('123')
      alert(this.$store.state.site.test)
    },
    methods:{
      a_dText(el,type){/*暂时解决安卓输入文字闪退问题的安卓回调方法*/
//        alert('a_dText:type:'+type+',el:'+el)
        if(window.GreenSchool){
          this.$store.state.a_dInput.node = el
          type ? this.$store.state.a_dInput.type = type : this.$store.state.a_dInput.type = ''
          GreenSchool.inputText(node.target.value)
        }
      },
      sub(){
        let vm = this , B = vm.$store.state.BP

        let pObj = {
//          url:IF.addData,
          userid:B.userid,
          sid:B.sid,
          classid:vm.deptOrClass.classid,//@#
          deptid:vm.deptOrClass.deptid,//@#
          itemtypeid:vm.borrowType.itemtypeid,//@#
          itemtnum:vm.applyNum,
          goodsmanagementid:vm.itemName.id,//@#
          approver:vm.firstApprover.id,
          itemname:vm.itemName.val,
          note:vm.applyReason,
          type:config.obj.type,
          pageborrowtime:vm.pageborrowtime,
          pagereturntime:vm.pagereturntime
        }
        if(vm.itemName.val && vm.pagereturntime && vm.pageborrowtime && vm.firstApprover.val && base.dateCompare(vm.pageborrowtime,vm.pagereturntime)){
          ajax.post(IF.addData,pObj,function(d){
            vm.$router.replace({path:'/borrow'})
          })
        }else if(!base.dateCompare(vm.pageborrowtime,vm.pagereturntime)){
          vm.modal.content = '日期不对'
          vm.modal.show = true
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
//              url:IF.searchDandC,
              userid:B.userid,
              sid:B.sid,
              name:vm.deptOrClass.val.toUpperCase()
            }
            break;
          case 'itemType':
            pUrl = IF.searchItemType
            pObj = {
//              url:IF.searchItemType,
              userid:B.userid,
              sid:B.sid,
              itemtypename:vm.itemType.val.toUpperCase()
            }
            break;
          case 'itemName':
            pUrl = IF.fuzzyQuery
            pObj = {
//              url:IF.fuzzyQuery,
              userid:B.userid,
              sid:B.sid,
              itemtypeid:vm.borrowType.itemtypeid,
              itemname:vm.itemName.val.toUpperCase()
            }
            break;
        }

        vm.searchList.top = $(el.target).offset().top
        vm.searchList.target = el

        if(vm[type].val.length <= 0){
          vm.searchList.list = []
        }


        if(  vm[type].val.length > 0 && vm.post){ //( !vm.inputLock || !vm.inputCn ) &&
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

          },['name'])
        }
      },
      setApprover(el){
        let vm = this
        vm.searchList.top = ( $(el.target).offset().top + $('.all').scrollTop() )
        vm.searchList.target = el
        vm.searchList.list = vm.basic.firstapproverborrow

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
      },
      test(){
        this.remind.show = true
      }
    },
    mounted(){
      let currYear = (new Date()).getFullYear() , vm = this
      $("#startdate").mobiscroll().date({
        theme: "android-ics light",
        lang: "zh",
        cancelText: null,
        startYear: currYear-5,
        dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
        onSelect: function(inst){
          vm.pageborrowtime = inst+':00'
        }
      });
      $("#startdate").mobiscroll().datetime({
        theme: "android-ics light",
        lang: "zh",
        cancelText: null,
        dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
        timeFormat: 'HH:ii',
        onSelect: function(inst){
          vm.pageborrowtime = inst+':00'
        }
      })

      $("#enddate").mobiscroll().date({
        theme: "android-ics light",
        lang: "zh",
        cancelText: null,
        startYear: currYear-5,
        dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
        onSelect: function(inst){
          vm.pagereturntime = inst+':00'
        }
      });
      $("#enddate").mobiscroll().datetime({
        theme: "android-ics light",
        lang: "zh",
        cancelText: null,
        dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
        timeFormat: 'HH:ii',
        onSelect: function(inst){
          console.log(inst)
          vm.pagereturntime = inst+':00'
        }
      })

//      vm.$root.eventHub.$on('setA_DSearch',function(d){/*暂时解决安卓输入文字闪退问题的安卓回调方法*/
////        alert("on:type:"+d.type+',el:'+d.el)
//        vm[d.type].val = d.text
//        vm.search(d.type,d.el)
//      })

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
  .dw .dwfl{min-width:45px !important;}
</style>
