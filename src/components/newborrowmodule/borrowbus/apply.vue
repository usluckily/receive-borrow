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
            申请部门 : <input placeholder="请输入申请部门*"
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

      </div>

      <div class="con-box">
        <div class="item">
          <div>
            用车日期 : <input placeholder="借用日期*" v-model="pageborrowtime"  id="startdate"/>
          </div>
          <div>
            <img src="../../../assets/img/arrows2.png" class="icon"/>
          </div>
        </div>
        <div class="item">
          <div>
            返回日期 : <input placeholder="归还日期*" v-model="pagereturntime"   id="enddate"/>
          </div>
          <div>
            <img src="../../../assets/img/arrows2.png" class="icon"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item" style="display: block;">
            <span class="speSpan">用车事由 :</span> <textarea placeholder="请输入申请原因..." v-model="applyReason" class="speTextarea" />
          <div>
            <img src="../../../assets/img/icon/icon_audio@2x.png" class="icon" @click="test"/>
          </div>
        </div>
      </div>

      <div class="con-box">
        <div class="item">
          <div>
            目的地 : <input placeholder="请输入*" v-model="destination"/>
          </div>
        </div>

        <div class="item">
          <div>
            车辆类型 : <input placeholder="请输入*"
                          v-model="itemName.val"
                          @click="setBus($event)"/>
          </div>
        </div>

        <div class="item">
          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
            <span>是否往返 :</span> <m_checkBox ref="checkBox"></m_checkBox>
          </div>
        </div>
      </div>

      <chooseApprover ref="chooseAppr"></chooseApprover>

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
  import chooseApprover from '@/components/common/chooseapprover'
  import checkBox from '@/components/common/slidecheck'

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
        basic:{
          approveUser:[],
          venuedate:[],
          classtabledata:[],
          departmentdata:[]
        },
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
        destination:'',
        itemman:'',
        firstApprover:{
          val:'',
          id:''
        },
        borrowType:'',
      }
    },
    computed:{
      approveUserIds(){
        let vm = this , str = ''
        vm.$refs.chooseAppr.levelList.forEach(function(i,index){
          (index+1) == vm.$refs.chooseAppr.levelList.length ? str+=i.userId : str+=i.userId+','
        })
        return str
      }
    },
    created(){
      let vm = this ,B = vm.$store.state.BP,
        pObj = {
          userId:B.userid,
          sid:B.sid
        }

      ajax.post(IF.getBusBase,pObj,function(d){
        vm.basic.venuedate = d.venuedate
      },['name','classname','deptname','schoolBusName'])

      //add listen : addAppr  from @/components/common/chooseapprover
      vm.$root.eventHub.$on('addAppr',function(a){
        ajax.post(IF.getBusapprLevel,{ userId:B.userid,sid:B.sid,level:a.level },function(b){
          vm.$root.eventHub.$emit('setApprLevel',b)
        })
      })

      vm.$root.eventHub.$on('remindShow',function(d){
        vm.remind.show = d
      })
    },
    methods:{
      sub(){
        let vm = this , B = vm.$store.state.BP

        let pObj = {
          userId:B.userid,
          sid:B.sid,
//          classId:vm.deptOrClass.classid,//@#
          deptId:vm.deptOrClass.deptid,//@#
          schoolBusId:vm.itemName.id,//@#
          applyContent:vm.applyReason,
          borrowTime:vm.pageborrowtime,
          returnTime:vm.pagereturntime,
          destination:vm.destination,
          isReturn:vm.$refs.checkBox.check ? '0' : '1',
          approveUserIds:vm.approveUserIds
        }
        if(vm.itemName.id && vm.pagereturntime && vm.pageborrowtime && base.dateCompare(vm.pageborrowtime,vm.pagereturntime)){
          ajax.post(IF.addBus,pObj,function(d){
            vm.$router.replace({path:'/borrowBus'})
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
              userid:B.userid,
              sid:B.sid,
              name:vm.deptOrClass.val.toUpperCase()
            }
            break;
          case 'itemType':
            pUrl = IF.searchItemType
            pObj = {
              userid:B.userid,
              sid:B.sid,
              itemtypename:vm.itemType.val.toUpperCase()
            }
            break;
          case 'itemName':
            pUrl = IF.fuzzyQuery
            pObj = {
              userid:B.userid,
              sid:B.sid,
              itemtypeid:vm.borrowType.itemtypeid || '',
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
      setBus(el){
        let vm = this
        vm.searchList.top = ( $(el.target).offset().top + $('.all').scrollTop() )
        vm.searchList.target = el
        vm.basic.venuedate.forEach(function(i){
          vm.searchList.list.push({
            id:i.schoolBusId,
            name:i.schoolBusName
          })
        })

        vm.$root.eventHub.$off('setInfo')
        vm.$root.eventHub.$on('setInfo',function(d){
          vm.itemName.val = d.val
          vm.itemName.id = d.id
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

    },
    beforeDestroy(){
      this.$root.eventHub.$off('addAppr')
    },
    components:{
      f_btn:fbtn,
      fl_box:flbox,
      r_mind:remind,
      my_modal:modal,
      g_bg:gbg,
      chooseApprover:chooseApprover,
      m_checkBox:checkBox
    }
  })
</script>
<style>
  .dw .dwfl{min-width:45px !important;}
</style>
