<template>
  <div class="con-box">
    <div class="A">
      <div class="head-img-box B1">
        <img :src="itemInfo.applicantpic" v-if=" itemInfo.applicantpic && itemInfo.applicantpic != ''"/>
        <img src="../../../assets/img/defaultheadpic.jpg" v-else/>
      </div>
      <div class="B2">
        <p class="flex-box B">
          <span class="font1">{{ itemInfo.userName }}</span>
          <span class="font2">{{ itemInfo.createDate | dateFilter }}</span>
        </p>
        <p class="font2">{{ itemInfo.applicantclassname }}</p>
      </div>
    </div>

    <div class="info-list">
      <p><span class="font2">借用部门:</span>  <span>{{ itemInfo.deptname }} {{ itemInfo.classname }}</span></p>
      <p><span class="font2">物品场地:</span>  <span>{{ itemInfo.venueName }}</span></p>
      <p><span class="font2">借用理由:</span>  <span>{{ itemInfo.applyContent }}</span></p>
      <p><span class="font2">借用日期:</span>  <span>{{ itemInfo.applyDate | dateFilter }}</span></p>
      <p><span class="font2">归还日期:</span>  <span>{{ itemInfo.endDate | dateFilter  }}</span></p>
    </div>
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
<style scoped>
  .A{width:100%;padding:1rem 0;border-bottom:1px solid #EEEEEE;}
  .B1{float:left;}
  .B2{margin-left:4rem;height:4rem;padding-left:0.8rem;}
  .B2 > p{height:50%;}
  .B2 > p.flex-box{line-height:2.5rem;justify-content:space-between;}
</style>
