import Vue from 'vue'
import Router from 'vue-router'

import borrow from './borrow'
import receive from './receive'
import test from './test'

import choose from '@/components/choose'
import borrowchoose from '@/components/borrowchoose'


Vue.use(Router)

export default new Router({
  routes: [
    ...borrow,
    ...receive,

    {
      path:'/choose/',
      name:'choose',
      component:choose
    },
    {
      path:'/borrowchoose/',
      name:'borrowchoose',
      component:borrowchoose
    },
    ...test

  ]
})
