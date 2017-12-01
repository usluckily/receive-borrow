<template>
  <div class="pop-panel">

    <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" class="icon-list" tag="div">

      <div class="icon-box" v-for="(i,index) in list" :key="index" :data-index="index">
        <div class="icon-img-box" >
          <img :src="i.pic" />
        </div>
        <p>{{ i.name }}</p>
      </div>

    </transition-group>

  </div>
</template>
<script>
    export default({
      name: 'popPanel',
      data(){
          return {
            list:[

            ]
          }
      },
      created(){
        let vm = this
        setTimeout(function(){
          vm.list.push({pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'},
            {pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'},
            {pic:'http://hyjy.oss-cn-shenzhen.aliyuncs.com/132/593232110/image/20171114/1510638661534.jpg',name:'阿斯顿'},)
        },1000)

      },
      methods:{
        beforeEnter:function(el){
          el.style.position = 'absolute'
        },
        enter:function(el){
          var delay = el.dataset.index * 100
          setTimeout(function () {
            el.style.position = 'relative'
          }, delay)
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
  background:#2E2E31;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
}
</style>
