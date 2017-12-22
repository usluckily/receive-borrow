<template>
  <div class="info-list">
    <p><span class="font2">申请部门:</span>  <span>{{ itemInfo.deptname }} {{ itemInfo.classname }}</span></p>
    <p><span class="font2">物品类别:</span>  <span>{{ itemInfo.itemtypename }}</span></p>
    <p><span class="font2">物品名称:</span>  <span>{{ itemInfo.itemname }}</span></p>
    <p><span class="font2">申请数量:</span>  <span>{{ itemInfo.itemnum }} {{ itemInfo.itemunit  }}</span></p>
    <p><span class="font2">领用理由:</span>  <span>{{ itemInfo.note }}</span></p>
  </div>
</template>
<script>
    export default({
      name: '',
      props:['itemInfo'],
      data(){
        return {}
      }
    })
</script>
<style>

</style>
