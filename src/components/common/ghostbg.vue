<template>
  <transition name="modalBg" >
    <div class="modalBg" v-show="modal.show" v-cloak></div>
  </transition>
</template>
<script>
  export default{
    name:'ghostBg',
    props:['parentModal'],
    data () {
      return {
        modal:this.parentModal
      }
    }
  }
</script>
<style scoped>
  .modalBg{background:#000;width:100%;height:100%;position:fixed;opacity:0.7;z-index:101}
  .modalBg-enter-active{
    transition:opacity 0.4s ease;
    opacity:0.7;
  }
  .modalBg-enter{
    opacity:0;
  }
  .modalBg-leave-active{
    transition:opacity 0.4s ease;
    opacity: 0;
  }
  .modalBg-leave{
    opacity:0.7;
  }
</style>
