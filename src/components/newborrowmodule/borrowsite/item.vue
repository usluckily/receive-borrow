<template>
  <li @click="jump">
    <div>
      <h4 class="font1" style="display: flex;justify-content: space-between;">
        <span>
          <span>{{ obj.userName }}的场地申请</span>
          &nbsp;&nbsp;
          <span class="color-y font2">{{ obj.status | statusFilter }}</span>
        </span>
        <span class="font2">{{ obj.createDate | dateFilterH }}</span>
      </h4>
      <p class="font2">场地申请：{{ obj.venueName }}</p>
      <p class="font3">使用时间：{{ obj.applyDate | dateFilter }}</p>
      <p class="font3">结束时间：{{ obj.endDate | dateFilter }}</p>
    </div>
  </li>
</template>
<script>
    export default({
      name: 'borrowsiteitem',
      props:['obj'],
      data(){
        return {
          data:this.obj || {},
        }
      },
      methods:{
        jump(){
          let vm = this , module = vm.$store.state.module || 'my'
          localStorage.itemInfo = JSON.stringify(vm.obj)
          vm.$router.push({path:'/borrowSite/'+module+'/details/'+vm.obj.id})
        }
      },
      filters:{
        dateFilter(val){
          if(val){
            return val.split('.')[0]
          }
        },
        dateFilterH(val){
          if(val){
            return val.split(' ')[0]
          }
        },
        statusFilter(val){
          switch(val){
            case '1':
              return '审批中';
            break
            case '2':
              return '已通过';
            break
            case '3':
              return '已驳回';
            break;
            case '4':
              return '已取消';
              break;
          }
        }
      },
      created(){

      }
    })
</script>
<style>

</style>
