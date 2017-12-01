/**
 * Created by Administrator on 2017/11/28.
 */
import borrowBus from '@/components/newborrowmodule/borrowbus'
import item from '@/components/newborrowmodule/borrowbus/item'
import apply from '@/components/newborrowmodule/borrowbus/apply'

import details from '@/components/newborrowmodule/borrowbus/details'
import detailsfrag from '@/components/newborrowmodule/borrowbus/detailsfrag'
import msg from '@/components/common/msg'

export default[
  {
    path:'/borrowBus',
    name:'borrowBus',
    component:borrowBus,
    children:[
      {
        path:'',
        name:'borrowBus',
        component:item
      }
    ]
  },
  {
    path:'/borrowBus/:status/details/:id',
    name:'busDetails',
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
  },
  {
    path:'/busApply',
    name:'busApply',
    component:apply
  }
]
