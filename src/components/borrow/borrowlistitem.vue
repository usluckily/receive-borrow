<template>
  <li @click="jump">
    <div>
      <h4 class="font1">
        <span>
          <span>{{ obj.applicant }}</span>
          &nbsp;&nbsp;
          <span class="color-y font2">{{ obj.statusname }}</span>
        </span>
        <span class="font2">{{ obj.inputtime | dateFilter }}</span>
      </h4>
      <p class="font2">{{ obj.itemtypename }}</p>
      <p class="font3">开始时间：{{ obj.borrowtime | dateFilter }}</p>
      <p class="font3">归还时间：{{ obj.returntime | dateFilter }}</p>
    </div>
  </li>
</template>
<script>
    export default({
      name: 'bitem',
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
          vm.$router.push({path:'/borrow/'+module+'/details/'+vm.obj.itemid})
        }
      },
      filters:{
        dateFilter(val){
          if(val){
            return val.split('.')[0]
          }
        }
      },
      created(){

      }
    })
</script>
<style scoped>
  h4.font1{display:flex;justify-content:space-between;}
  .font1,.font2,.font3{line-height:1.5rem;}
  .font3{display:flex;justify-content:space-between;}
</style>
