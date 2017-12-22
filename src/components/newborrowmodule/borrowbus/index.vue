<template>
  <transition name="page">
    <div class="all" style="overflow:hidden;">

      <div v-show="list.list.length < 1 && !loader" class="prompt">
        <p>{{ prompt.msg }}</p>
      </div>
      <!--无数据时的提示-->

      <loader v-show="loader"></loader>

      <my_nav :navList="navList" v-if="iosCtr"></my_nav>

      <div :class=" contentMargin ? 'pageContent' : 'content'">
        <my_list :list="list" :length="navList.list.length" v-if="iosCtr">
          <template slot="items" scope="props">

            <router-view :obj="props.obj" :tabStatus="props.tabStatus"></router-view>

          </template>
        </my_list>
      </div>

      <f_btn>
        <router-link  :to="'/busApply'" class="fbtn" tag="div" >校车申请</router-link>
      </f_btn>

    </div>
  </transition>
</template>
<script>
  import nav from '@/components/common/nav'
  import list from '@/components/common/list'
  import item from '@/components/receive/receivelistitem'
  import fbtn from '@/components/common/footerbtn'
  import loader from '@/components/common/loader'

  import ajax from '@/assets/js/ajax'
  import config from '@/assets/js/config'
  import IF from '@/assets/js/interface'
  import sl from '@/assets/js/scrollload'

    export default({
      name: 'borrowSite',
      data(){
        return {
          navList:{
            cur:0,
            list:[
              {tit:'待审批',id:'1',module:'dsp'},
              {tit:'已通过',id:'2',module:'ysp'},
              {tit:'已驳回',id:'3',module:'ysp'},
              {tit:'我的',id:'frMe',module:'my'},
            ]
          },
          module:this.$route.name,
          btnText:'',
          list:{
            list:[

            ]
          },
          prompt:{
            msg:'暂时没有数据'
          },
          contentMargin:true,
//          listTransArr:['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment','issueman','applicant'],
          obj:'',
          iosCtr:true, //在ios下先销毁该组件，待param过来后再创建
          pObj:'',
          total:'',
          loader:false//页码总数
        }
      },
      methods:{
        init(){
          let vm = this , BP = vm.$store.state.BP
          if(vm.obj.permissions == ''){
            this.contentMargin = false
          }
//          vm.navList.list = vm.obj.nav;

          vm.pObj = {
            sid:BP.sid,
            userId:BP.userid,
            pageIndexName:1,
            permission:vm.obj.showall,
            status:(parseInt(vm.$route.query.sliderPageId)+1) || 1
          }

          if(vm.obj.permissions == ''){
            delete vm.pObj.status
            vm.navList.list = []
          }

          vm.loader = true
          ajax.post(IF.getBusList,vm.pObj,function(d){
            vm.list.list = d.data
            vm.loader = false
          })
        }
      },
      created(){
        let vm = this , BP = vm.$store.state.BP , frMe = false
        vm.obj = config.getBase(this.$route.name)
        vm.init()

        vm.$root.eventHub.$on('slide',function(d){
          vm.loader = true

          if(vm.navList.list[d].id == 'frMe'){
            frMe = true
          }else{
            frMe = false
          }

          ajax.post(IF.getBusList,{ status:frMe ? undefined : d+1,userId:BP.userid,sid:BP.sid,permission:frMe ? 0 : vm.obj.showall  },function(d){
            vm.list.list = d.data
            vm.loader = false
          })
        })
      },
      components:{
        my_nav:nav,
        my_list:list,
        item:item,
        f_btn:fbtn,
        loader:loader
      }
    })
</script>
<style>

</style>
