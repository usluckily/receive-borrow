/**
 * Created by Administrator on 2017/6/13.
 */
import details from '@/components/details'
import msg from '@/components/common/msg'

import detailsfrag from '@/components/receive/detailsfrag'

import test from '@/components/test/one'

export default [
  {
    path:'/receive/:status/details/:id',
    name:'rdetails',
    component:details,
    children:[
      {
        path:'msg',
        components:{
          msg:msg
        }
      },
      {
        path:'',
        components:{
          info:detailsfrag
        }
      }
    ]
  }
]
