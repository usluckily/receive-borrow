<template>

  <div class="rotate-box">

    <div class="rotate-con">
      <div v-if="!type">{{ conText.num }}</div>
      <p>{{ conText.tit }}</p>
    </div>

    <transition-group tag="ul"
                      v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
    >

      <li v-for="(i,index) in rotateList"
          :class="i.status"
          :style="{ transform:'rotate('+index*10+'deg)' }"
          :key="index"
          :data-id="index"
          :data-status="i.status"
          v-if="show"></li>

    </transition-group>

  </div>


</template>
<script>
    export default({
      name: 'rotate',
      props:{
        percent:{
          type:String,
          default:''
        },
        tit:{
          type:String,
          default:''
        },
        type:{
          type:String,
          default:''
        }
      },
      data(){
        return {
          show:false,
          arr:[]
        }
      },
      computed:{
        rotateList(){
          let vm = this , x = parseInt(vm.percent) , y = 100 , arr = [] , sum = 36 , num = parseInt((x/y)*36)

          if(vm.type == '1'){

            for(var i = 0;i<sum;i++){
              arr.push({
                status:'light'
              })
            }

          }else{
            for(var i = 0;i<sum;i++){

              if(i<num){
                arr.push({
                  status:'light'
                })
              }else{
                arr.push({
                  status:'dark'
                })
              }

            }
          }

          return arr

        },
        conText(){
          let vm = this
          return{
            num:vm.percent,
            tit:vm.tit
          }
        }
      },
      methods:{
        beforeEnter:function(el){
          el.className = 'dark'
        },
        enter:function(el){
          let delay = el.dataset.id , status = el.dataset.status , vm = this

//          vm.arr.push(el)

          setTimeout(function(){

//            console.log('x')
//            console.log(el)

            if(status == 'light'){
              el.className = 'light'
            }
          },20*delay)
        }
      },
      mounted(){
        this.show = true
      }
    })
</script>
<style scoped>
  .rotate-box{
    width:5rem;
    height:5rem;
    position:relative;
  }
  .rotate-box ul{
    width:100%;
    height:100%;
    position:relative;
  }
  .rotate-box ul > li{
    width:0.2rem;
    height:0.4rem;
    transform-origin:0rem 2.5rem;
    position:absolute;
    left:2.5rem;
  }
  .rotate-box .light{
    background:#FFCC00;
  }
  .rotate-box .dark{
    background:#433E2C;
  }
  .rotate-box .rotate-con{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    color:#fff;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-content: center;
    font-size:0.9rem;
    align-items: center;
  }
  .rotate-box .rotate-con>div,.rotate-box .rotate-con>p{
    line-height:1.5rem;
  }
  .rotate-box .rotate-con>div{
    width:3rem;
    text-align:center;
    border-bottom:1px solid #58585A;
  }
  .rotate-box .rotate-con>p{
    font-size:0.8rem;
    text-align: center;
    width: 100%;
  }
</style>
