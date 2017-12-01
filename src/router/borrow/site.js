/**
 * Created by Administrator on 2017/11/9.
 */
import borrowSite from '@/components/newborrowmodule/borrowsite'
import sitem from '@/components/newborrowmodule/borrowsite/item'
import apply from '@/components/newborrowmodule/borrowsite/apply'

import details from '@/components/newborrowmodule/borrowsite/details'
import detailsfrag from '@/components/newborrowmodule/borrowsite/detailsfrag'
import msg from '@/components/common/msg'

export default[
  {
    path:'/borrowSite',
    name:'borrowSite',
    component:borrowSite,
    children:[
      {
        path:'',
        name:'borrowSite',
        component:sitem
      }
    ]
  },
  {
    path:'/borrowSite/:status/details/:id',
    name:'siteDetails',
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
    path:'/siteApply',
    name:'siteApply',
    component:apply
  }
]
