<template>
  <div class="info-list">
    <p><span class="font2">借用部门:</span>  <span>{{ itemInfo.deptname }} {{ itemInfo.classname }}</span></p>
    <p><span class="font2">借用类型:</span>  <span>{{ itemInfo.itemtypename }}</span></p>
    <p><span class="font2">物品名称:</span>  <span>{{ itemInfo.itemname }}</span></p>
    <p><span class="font2">申请数量:</span>  <span>{{ itemInfo.itemnum }}</span></p>
    <p><span class="font2">借用理由:</span>  <span>{{ itemInfo.note }}</span></p>
    <p><span class="font2">借用日期:</span>  <span>{{ itemInfo.borrowtime | dateFilter }}</span></p>
    <p><span class="font2">归还日期:</span>  <span>{{ itemInfo.returntime | dateFilter  }}</span></p>
  </div>
</template>
<script>
    export default({
      name: '',
      props:['itemInfo'],
      data(){
        return {}
      },
      filters:{
        dateFilter(val){
          if(val){
            return val.split('.')[0]
          }
        }
      }
    })
</script>
<style>

</style>
