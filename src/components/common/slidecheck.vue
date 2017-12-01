<template>
  <div class="check-box" :id="boxId" @click="check=!check" :check="check">
    <div class="range"></div>
  </div>
</template>
<script>
    export default({
      name: 'slidecheck',
      data(){
        return {
          check:false
        }
      },
      computed:{
        boxId(){
          return this.check ? 'check' : ''
        }
      }
    })
</script>
<style scoped>
  .check-box{
    width:3.5rem;
    height:1.7rem;
    border-radius:0.9rem;
    background:#C6C6C6;
    position:relative;
    padding:0.1rem;
    transition:background 0.3s;
  }
  .check-box .range{
    height:1.5rem;
    width:1.5rem;
    left:0;
    border-radius:50%;
    background:#fff;
    box-shadow:0 0 0.2rem #000;
    position:absolute;
    transition:left 0.3s;
  }
  .check-box#check{
    background:#52C29E;
  }
  .check-box#check .range{
    left:2rem;
  }
</style>
