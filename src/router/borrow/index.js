/**
 * Created by Administrator on 2017/6/8.
 */
import details from './details'
import site from './site'
import bus from './bus'

import mainPage from '@/components'
import apply from '@/components/borrow/bapply'
import bitem from '@/components/borrow/borrowlistitem'

export default [
  {
    path:'/borrow/',
    name:'borrow',
    component:mainPage,
    children:[
      {
        path:'',
        name:'borrow',
        component:bitem
      }
    ]
  },
  {
    path:'/borrow/apply/',
    name:'bapply',
    component:apply
  },
  ...details,
  ...site,
  ...bus
]
