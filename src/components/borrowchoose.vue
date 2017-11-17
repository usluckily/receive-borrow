<template>
  <div class="all">
    <div class="tab">
      <ul>
        <li class="tab" @click="setBorrowType(i)" v-for="i in tab.list">
          <div class="tab_img_box">
            <img src="../assets/img/test.png"/>
          </div>
          <p>{{ i.name }}</p>
        </li>
      </ul>
    </div>
  </div>
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
        ajax.post(IF.getBase,{sid:B.sid,userid:B.userid},function(d){

          vm.tab.list = d.borrowtypedata
          localStorage.approveborrownames = d.approveborrownames

        },['name','classname','deptname','itemman','approveitemnames','approveborrownames'])
      }
    })
</script>
<style>
  .tab{width:100%;padding-top:0.5rem;}
  .tab ul{display:flex;flex-wrap:wrap;justify-content:flex-start;}
  .tab ul li{width:25%;text-align:center;margin-top: 0.5rem;padding: 0.5rem 0;}
  .tab ul li .tab_img_box{width:3rem;margin:0 auto;}
  .tab_img_box img{width:100%;display:block;}
  .tab ul li p{font-size:0.9rem;color:#666;line-height:2rem;overflow: hidden;display:block;text-overflow: ellipsis;white-space: nowrap;}
</style>
