/**
 * Created by Administrator on 2017/6/13.
 */
import details from '@/components/details'
import msg from '@/components/common/msg'

import detailsfrag from '@/components/borrow/detailsfrag'


export default [
  {
    path:'/borrow/:status/details/:id',
    name:'bdetails',
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
