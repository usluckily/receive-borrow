<template>
  <div class="con-box">
    <div class="A">
      <div class="head-img-box B1">
        <img :src="itemInfo.userPic" v-if=" itemInfo.userPic && itemInfo.userPic != ''"/>
        <img src="../../../assets/img/defaultheadpic.jpg" v-else/>
      </div>
      <div class="B2">
        <p class="flex-box B">
          <span class="font1">{{ itemInfo.usreName }}</span>
          <span class="font2">{{ itemInfo.borrowTime | dateFilter }}</span>
        </p>
        <p class="font2">{{ itemInfo.applicantclassname }}</p>
      </div>
    </div>

    <div class="info-list">
      <p><span class="font2">借用部门:</span>  <span>{{ itemInfo.dept }} {{ itemInfo.classname }}</span></p>
      <p><span class="font2">用车事由:</span>  <span>{{ itemInfo.content }}</span></p>
      <p><span class="font2">用车日期:</span>  <span>{{ itemInfo.createTime | dateFilter }}</span></p>
      <p><span class="font2">返回日期:</span>  <span>{{ itemInfo.returnTime | dateFilter  }}</span></p>
      <p style="border-bottom:1px solid #eee"></p>
      <p><span class="font2">始发地点:</span>  <span>学校</span></p>
      <p><span class="font2">车辆类型:</span>  <span>{{ itemInfo.venue }}</span></p>
      <p><span class="font2">是否往返:</span>  <span>{{ itemInfo.isReturn == '0' ? '返回' : '不返回' }}</span></p>
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
