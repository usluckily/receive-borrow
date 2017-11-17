<template>
  <div class="banner swiperContent">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="i in swiperLen" :style="styleObj">

        <ul class="normal-list">
          <slot name="items" v-for="(i,index) in listData.list" :obj="i" :tabStatus="mySwiper.activeIndex"></slot>
        </ul>
        <div style="height:3.7rem;width:100%;opacity:0"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Swiper from 'swiper'

    export default({
        name: 'normalList',
        props:['list','length'],
        data(){
            return {
              listData:this.list,
              mySwiper:'',
              swiperLen:this.length != 0 ? this.length : 1,
              styleObj:{
                height:''
              }
            }
        },
        methods:{
          slider:function(){
            let vm = this
            vm.mySwiper = new Swiper('.swiperContent',{
//              initialSlide:2,
              loop: false,
              pagination : '.pagination',
              freeMode:false,
              speed:300,
              onSlideChangeStart:function(){
                vm.$root.eventHub.$emit('slide',vm.mySwiper.activeIndex)
//                location.href = location.href.split('?')[0]+'?sliderPageId='+vm.mySwiper.activeIndex//改变location.search值，记录滑动的页码
//                alert(vm.$route.name)
                vm.$router.replace({path:vm.$route.name,query:{sliderPageId:vm.mySwiper.activeIndex}})
              },
              onSlideChangeEnd: function(){

              }
            });
          }
        },
        created(){
          let vm = this
//          vm.$root.eventHub.$on('nav',function(d){
//            vm.mySwiper.slideTo(d,300)
//          })
        },
        mounted(){
          this.slider();
          this.styleObj.height = $(window).height() - $('.normal-nav').height()+'px'
          this.mySwiper.slideTo(this.$route.query.sliderPageId,300)//页面创建完毕时根据location.search的sliderPageId值滑动到对应页
        },
        beforeDestroy(){
          let vm = this
          vm.$root.eventHub.$off('nav')
        },
      watch:{
        '$route'(to,from){
          let vm = this
            if(to.query.sliderPageId || to.query.sliderPageId == '0'){
              vm.mySwiper.slideTo(to.query.sliderPageId,300)//监听$route的sliderPageId的变化并对应滑动页面
            }
        }
      }
    })
</script>
<style>

</style>
