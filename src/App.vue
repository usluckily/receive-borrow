<template>
  <div id="app">
    <m_prompt></m_prompt>
    <router-view></router-view>
  </div>
</template>

<script>
  import {NI} from '@/assets/js/nodeInit'
  import config from '@/assets/js/config'

  import prompt from '@/components/common/prompt'

  export default {
    name: 'app',
    created(){
      NI().rootFontSize();
//      let obj = config.getBase(this.$route.name);
//      console.log(obj)
    },
    components:{
      m_prompt:prompt
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style src="./assets/css/base.css"></style>
<style src="./assets/css/swiper-3.3.1.min.css"></style>
<style src="./assets/css/mobiscroll.css"></style>
<style src="./assets/css/loader.css"></style>
