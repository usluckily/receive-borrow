<template>
  <div class="normal-nav">
    <ul>
      <li v-for="(i,index) in listData.list" :key="i.id" :class=" listData.cur == index ? 'cur' : '' " @click="emitIndex(index)">{{ i.tit }}</li>
    </ul>
  </div>
</template>
<script>
    export default({
      name: 'nav',
      props:['navList'],
      data(){
        return {
          listData:this.navList || {
            cur:0,
            status:0,
            list:[

            ]
          }
        }
      },
      methods:{
        emitIndex(x){
          let vm = this
          vm.listData.cur = x;
//          location.href = location.href.split('?')[0]+'?sliderPageId='+x//改变location.search值，记录滑动的页码
//          vm.$root.eventHub.$emit('nav',vm.listData.cur) //在list.vue中有监听
          vm.$router.replace({path:vm.$route.name,query:{sliderPageId:x}})
        }
      },
      created(){
        let vm = this

        if(vm.listData.list[0]){
          vm.$store.state.module = vm.listData.list[0].module
        }else{
          vm.$store.state.module = 'my'
        }

        vm.$root.eventHub.$on('slide',function(d){
          vm.listData.cur = d;
          vm.$store.state.module = vm.listData.list[d].module
        })
      },
      beforeDestroy(){
        let vm = this
        vm.$root.eventHub.$off('slide')
      },
    })
</script>
<style>

</style>
