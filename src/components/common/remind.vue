<template>
  <div class="fullScreen-box">
    <div @click="ctr = true" v-if="!ctr">
      <img src="../../assets/img/remind.png" />
    </div>
    <div @click="close" v-if="ctr">
      <img src="../../assets/img/remind2.png" />
    </div>
  </div>
</template>
<script>
    export default({
      name: 'remind',
      props:['show'],
      data(){
        return {
          ctr:false
        }
      },
      methods:{
        close(){
          this.$root.eventHub.$emit('remindShow',false)
        }
      }
    })
</script>
<style>
  .fullScreen-box{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index:200;
  }
  .fullScreen-box div{
    width:100%;
    height:100%;
    background:url('../../assets/img/bg.png') repeat;
  }
  .fullScreen-box div img{
    width:100%;
    position:absolute;
    bottom:0;
  }
</style>
