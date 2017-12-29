// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import $ from 'jquery'

Vue.config.productionTip = false

Vue.use(Vuex)
//
// let basicParams = {userid:'722471394',sid:'46',perm:['ASD','SZWPGLY','WPLYTY'],roleid:'676,193'};
let basicParams = {userid:'458850415',sid:'4',perm:['WPJYTY'],roleid:'2445,2460'};//171

const store = new Vuex.Store({
  state:{
    status:0,
    module:'',
    type:'',
    BP:basicParams,
    a_dInput:{ //暂时解决安卓输入文字闪退问题的安卓回调方法，用来记录是从哪个元素点击的，及对应type
      node:'',
      type:''
    },
    site:{
      test:''
    }
  },
  mutations:{

  }
})

const mainVueObj = {
  el: '#app',
  router,
  store,
  data:{
    eventHub:new Vue(),
  },
  methods:{
    callSearch(t){/*暂时解决安卓输入文字闪退问题的安卓回调方法*/
      let vm = this
      // alert('emit:type:'+vm.$store.state.a_dInput.type+',el:'+vm.$store.state.a_dInput.node)
      vm.$root.eventHub.$emit('setA_DSearch',{el:vm.$store.state.a_dInput.node,type:vm.$store.state.a_dInput.type,text:t})
    },
    callSetText(t){
      let vm = this
      vm.$root.eventHub.$emit('setA_DSetText',{el:vm.$store.state.a_dInput.node,type:vm.$store.state.a_dInput.type,text:t})
    }
  },
  template: '<App/>',
  components: { App }
}

if(window.GreenSchool){
  basicParams.userid = GreenSchool.getUserID()
  basicParams.sid = GreenSchool.getSchoolId()
  basicParams.perm = GreenSchool.getPermissions('WPLY')
  basicParams.roleid = GreenSchool.getRoleId()

  new Vue(mainVueObj)

  // if(GreenSchool.setStatusBarByColor){
  //   GreenSchool.setStatusBarByColor('#F76868')//  0xffD74F25
  // }

}else if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  //轮询检测ios端参数是否传到
  let SI = setInterval(function(){
    if(window.iosParams.userid != ''){

      basicParams.userid = window.iosParams.userid
      basicParams.sid = window.iosParams.sid;
      basicParams.roleid = window.iosParams.roleid;
      basicParams.perm = window.iosParams.perm;

      new Vue(mainVueObj)

      clearInterval(SI)
    }
  },50)
}else{
  new Vue(mainVueObj)
}
//

/* eslint-disable no-new */
// window.globalVue = new Vue(mainVueObj)


/*/!*暂时解决安卓输入文字闪退问题的安卓回调方法*!/
window.inputText = function(t){
  let a_dInput = globalVue.$store.state.a_dInput
  if(a_dInput.type != ''){
    globalVue.callSearch(t)
  }else{
    globalVue.callSetText(t)
  }

}
/!*暂时解决安卓输入文字闪退问题的安卓回调方法*!/*/
