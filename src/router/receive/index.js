/**
 * Created by Administrator on 2017/6/8.
 */
import details from './details'

import mainPage from '@/components'
import apply from '@/components/receive/rapply'
import ritem from '@/components/receive/receivelistitem'

export default [
  {
    path:'/receive/',
    name:'receive',
    component:mainPage,
    children:[
      {
        path:'',
        name:'receive',
        component:ritem
      }
    ]
  },
  {
    path:'/receive/apply/',
    name:'rapply',
    component:apply
  },
  ...details
]
