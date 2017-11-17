<template>
  <div class="pop-panel">
    <div class="item" v-for="i in list"></div>
  </div>
</template>
<script>
    export default({
      name: 'popPanel',
      data(){
          return {
            list:[
              {pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'},
              {pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'},
              {pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'}
            ]
          }
      }
    })
</script>
<style scoped>
.pop-panel{
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  display:flex;
}
.pop-panel .item{

}
</style>
