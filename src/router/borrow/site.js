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
    path:'/borrowSite/:id',
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
    component:apply,
    beforeRouteEnter: (to, from, next) => {
      // ...
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.$store.state.site.test = 'adasasdasdasdasdas'
      })
    }
  }
]
