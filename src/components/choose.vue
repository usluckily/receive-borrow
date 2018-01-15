<template>
  <transition name="page">
    <div class="all">
      <div class="tab">
        <ul>
          <router-link class="tab" tag="li" to="/receive">
            <div class="tab_img_box">
              <img src="../assets/img/icon/icon_rec_n.png"/>
            </div>
            <p>物品领用</p>
          </router-link>
          <router-link class="tab" tag="li" to="/borrowSite">
            <div class="tab_img_box">
              <img src="../assets/img/icon/icon_field(2).png"/>
            </div>
            <p>场地借用</p>
          </router-link>
          <router-link class="tab" tag="li" to="/borrowBus">
            <div class="tab_img_box">
              <img src="../assets/img/icon/icon_bus3.png"/>
            </div>
            <p>校车借用</p>
          </router-link>


          <!--&lt;!&ndash;动态&ndash;&gt;-->
          <!--<li class="tab" @click="setBorrowType(i)" v-for="i in tab.list">-->
            <!--<div class="tab_img_box">-->
              <!--<img :src="i.picsummary" v-if="i.picsummary != ''"/>-->
              <!--<img src="../assets/img/test.png" v-else/>-->
            <!--</div>-->
            <!--<p>{{ i.name }}</p>-->
          <!--</li>-->

        </ul>
      </div>



    </div>
  </transition>
</template>
<script>

  import $ from 'jquery'
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

  export default({
    name: 'borrowchoose',
    data(){
      return {
        tab:{
          list:[]
        }
      }
    },
    methods:{
      setBorrowType(i){
        localStorage.borrowType = JSON.stringify(i)
        this.$router.push({path:'/borrow'})
      }
    },
    created(){
      let vm = this , B = vm.$store.state.BP

      if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        let s = setInterval(function(){
          if(window.iosParams.userid != ''){
            ajax.post(IF.getBase,{sid:B.sid,userid:B.userid},function(d){

              vm.tab.list = d.borrowtypedata
              localStorage.approveborrownames = d.approveborrownames

            },['name','classname','deptname','itemman','approveitemnames','approveborrownames'])
            clearInterval(s)
          }
        },100)
      }else{
        ajax.post(IF.getBase,{sid:B.sid,userid:B.userid},function(d){

          vm.tab.list = d.borrowtypedata
          localStorage.approveborrownames = d.approveborrownames

        },['name','classname','deptname','itemman','approveitemnames','approveborrownames'])
      }

    }
  })
</script>
<style>

</style>
