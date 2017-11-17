<template>
  <transition name="page">
    <div class="all">
      <my_nav :navList="navList"></my_nav>

      <div :class=" contentMargin ? 'pageContent' : 'content'">
        <my_list :list="list" :length="navList.list.length">
          <template slot="items" scope="props">

            <r_item :obj="props.obj" :tabStatus="props.tabStatus"></r_item>

          </template>
        </my_list>
      </div>

      <f_btn>
        <router-link to="/borrow/apply/" class="fbtn" tag="div" >{{ btnText }}</router-link>
      </f_btn>

    </div>
  </transition>
</template>
<script>
  import nav from '@/components/common/nav'
  import list from '@/components/common/list'
  import ritem from '@/components/receive/receivelistitem'
  import fbtn from '@/components/common/footerbtn'
//  import B from '@/assets/js/simulationBaseInfo'
  import ajax from '@/assets/js/ajax'
  import config from '@/assets/js/config'
  import IF from '@/assets/js/interface'

    export default({
      name: 'receiveMainPage',
      data(){
        return {
          navList:{
            cur:0,
            list:[
              {tit:'待发放',id:'1'},
              {tit:'已发放',id:'2'},
              {tit:'我的',id:'3'},
            ]
          },
          btnText:'申请领用',
          list:{
            list:[
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'1'},
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'2'},
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'3'},
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'4'},
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'5'},
              {approveman:'阿斯顿',status:'1',statusname:'待审核',inputtime:'2011-11-11',itemtypename:'xx类',itemname:'第三个',classname:'',deptname:'有关部门',id:'6'}
            ]
          },
          contentMargin:true
        }
      },
      created(){
        let vm = this , B = vm.$store.state.BP
        let obj = config.getBase(this.$route.name);

        if(obj.permissions == ''){
          this.contentMargin = false
        }

        this.navList.list = obj.nav;

        let pObj = {
          url:IF.getList,
          sid:B.sid,
          userid:B.userid,
          roleid:B.roleid,
          type:obj.type,
//          showAll:obj.showall,
        }

        if(obj.status){
          pObj.status = obj.status
        }

        vm.$root.eventHub.$on('slide',function(d){
          if(obj.nav[d].id == 'frMe'){
            pObj.way = obj.nav[d].id
            delete pObj.status
          }else{
            pObj.status = obj.nav[d].id//获取status
          }

          ajax.post('/A',pObj,function(d){
            vm.list.list = d.data
          },['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment'])
        })


        ajax.post('/A',pObj,function(d){
          vm.list.list = d.data
        },['classname','deptname','itemname','statusname','note','itemtypename','approveman','comment'])


      },
      beforeDestroy(){
        let vm = this
        vm.$root.eventHub.$off('slide')
      },
      methods:{
        test(){
          alert('askjdgakdahkdgs')
        }
      },
      components:{
        my_nav:nav,
        my_list:list,
        r_item:ritem,
        f_btn:fbtn
      }
    })
</script>
<style>

</style>
