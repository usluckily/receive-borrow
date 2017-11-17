<template>
  <transition name="page">
    <div class="all">

      <div v-show="list.list.length < 1" class="prompt">
        <p>{{ prompt.msg }}</p>
      </div>
      <!--无数据时的提示-->

      <loader v-show="loader"></loader>

      <my_nav :navList="navList" v-if="iosCtr"></my_nav>

      <div :class=" contentMargin ? 'pageContent' : 'content'">
        <my_list :list="list" :length="navList.list.length" v-if="iosCtr">
          <template slot="items" scope="props">

            <!--<r_item :obj="props.obj" :tabStatus="props.tabStatus"></r_item>-->

            <router-view :obj="props.obj" :tabStatus="props.tabStatus"></router-view>
          </template>
        </my_list>
      </div>

      <f_btn>
        <router-link  :to="'/'+module+'/apply/'" class="fbtn" tag="div" >{{ localBtnText }}</router-link>
      </f_btn>

    </div>
  </transition>
</template>
<script>
  import nav from '@/components/common/nav'
  import list from '@/components/common/list'
  import ritem from '@/components/receive/receivelistitem'
  import fbtn from '@/components/common/footerbtn'
  import loader from '@/components/common/loader'

//  import B from '@/assets/js/simulationBaseInfo'
  import ajax from '@/assets/js/ajax'
  import config from '@/assets/js/config'
  import IF from '@/assets/js/interface'
  import sl from '@/assets/js/scrollload'

    export default({
      name: 'receiveMainPage',
      data(){
        return {
          navList:{
            cur:0,
            list:[
              {}
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
      created(){
        let vm = this
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

          vm.iosCtr = false//在ios下先销毁该组件，待param过来后再创建

          let sh = setInterval(function(){
            if(window.iosParams.userid != ''){

              vm.obj = config.getBase(vm.$route.name)//get ios's param

              vm.iosCtr = true//在ios下先销毁该组件，待param过来后再创建

              vm.init()

              clearInterval(sh)
            }
          },50)
        }else{
          vm.obj = config.getBase(this.$route.name)
          vm.init()
        }

      },
      mounted(){
        let vm = this
        vm.$root.eventHub.$emit('SL')
        sl.init('.swiper-slide',function(){
          if(vm.pObj.pageIndexName < vm.total){
            vm.pObj.pageIndexName += 1;
            vm.loader = true
            ajax.post(IF.getList,vm.pObj,function(d){
              vm.list.list = vm.list.list.concat(d.data)
              vm.loader = false
            },['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment','issueman','applicant'])
          }
        })
      },
      beforeDestroy(){
        let vm = this
        vm.$root.eventHub.$off('slide')
      },
      methods:{
        init(){
          let vm = this , B = vm.$store.state.BP
          if(vm.obj.permissions == ''){
            this.contentMargin = false
          }

          vm.navList.list = vm.obj.nav;

          vm.pObj = {
//            url:IF.getList,
            sid:B.sid,
            userid:B.userid,
            roleid:B.roleid,
            type:vm.obj.type,
            pageIndexName:1,
            showAll:vm.obj.showall
          }

          if(vm.$route.query.sliderPageId){//这里是为了让回退时取到正确的status
            vm.pObj.status = vm.obj.nav[parseInt(vm.$route.query.sliderPageId)].id
          }else if(vm.obj.status){
            vm.pObj.status = vm.obj.status
          }else if(vm.obj.way){
            vm.pObj.way = vm.obj.way
          }

          if(vm.$route.name == 'borrow'){
            vm.pObj.itemtypeid = JSON.parse(localStorage.borrowType).itemtypeid
          }


          vm.$root.eventHub.$on('slide',function(d){
            vm.pObj.pageIndexName = 1
            if(vm.obj.nav[d].id == 'frMe'){
              vm.pObj.way = vm.obj.nav[d].id
              vm.pObj.showAll = 0
              delete vm.pObj.status
            }else{
              vm.pObj.status = vm.obj.nav[d].id//获取status
              vm.pObj.showAll = 1
              delete vm.pObj.way
            }

            vm.loader = true
            ajax.post(IF.getList,vm.pObj,function(d){
              vm.list.list = d.data
              vm.total = d.total
              vm.loader = false
            },['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment','issueman','applicant'])
          })


          vm.loader = true
          ajax.post(IF.getList,vm.pObj,function(d){
            vm.list.list = d.data
            vm.total = d.total
            vm.loader = false
          },['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment','issueman','applicant'])

        }
      },
      computed:{
        localBtnText(){
          return this.obj.indexBtnText
        }
      },
      components:{
        my_nav:nav,
        my_list:list,
        r_item:ritem,
        f_btn:fbtn,
        loader:loader
      }
    })
</script>
<style scoped>
.all{overflow:hidden}
</style>
