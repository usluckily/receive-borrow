import Vue from 'vue'
import Router from 'vue-router'

import borrow from './borrow'
import receive from './receive'

import choose from '@/components/choose'
import borrowchoose from '@/components/borrowchoose'
import test from '@/components/test/test'

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
    {
      path:'/test',
      name:'test',
      component:test
    }

  ]
})
