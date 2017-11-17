<template>
  <li @click="jump"> <!--  <router-link :to=" '/receive/'+tabStatus+'/details/'+obj.itemid " tag="li" :status="tabStatus">  -->  <!--  <router-link :to=" '/receive/details/'+data.id " tag="li">  -->
    <div>
      <h4 class="font1">
        <span>{{ obj.applicant }}</span>
        <span class="color-y font2">{{ obj.statusname }}</span>
      </h4>
      <p class="font2">{{ obj.deptname }} {{ obj.classname }}</p>
      <p class="font3"><span>{{ obj.itemtypename }}/{{ obj.itemname }}</span> <span>{{ obj.inputtime | dateFilter }}</span></p>
    </div>
  </li>
</template>
<script>
    export default({
      name: 'ritem',
      props:['obj','tabStatus'],
      data(){
        return {
          data:this.obj || {},
          status:this.tabStatus
        }
      },
      methods:{
        jump(){
          let vm = this , module = vm.$store.state.module || 'my'
          localStorage.itemInfo = JSON.stringify(vm.obj)
          vm.$router.push({path:'/receive/'+module+'/details/'+vm.obj.itemid})
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
//        console.log(this.obj)
      }
    })
</script>
<style scoped>
  h4.font1{display:flex;justify-content:space-between;}
  .font1,.font2,.font3{line-height:1.5rem;}
  .font3{display:flex;justify-content:space-between;}
</style>
