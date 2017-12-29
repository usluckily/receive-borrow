<template>
  <div class="con-box">

    <div class="pop-panel" v-show="popPanelShow">

      <m_ballPulse v-show=" ballpulse_loader "></m_ballPulse>

      <div v-for="i in approverList" @click="setLevel(i)" class="pop-item">
        <div>
          <img :src="i.userPic" v-if=" i.userPic != '' && i.userPic != 'null' "/>
          <img src="../../assets/img/logo.png" v-else/>
        </div>
        <span>{{ i.userName }}</span>
      </div>

      <div class="fbtn-box" style="z-index:101;">
        <div class="fbtn" @click="popClose">关闭</div>
      </div>
    </div>

    <!--去掉该组件item的display  flex属性-->
    <div class="item" style="display:block;">

      <div>审批人：</div>

      <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:beforeLeave="beforeLeave" class="icon-list" tag="div" style="justify-content:flex-start;">

        <div class="icon-box" v-for="(i,index) in levelList" :key="index" :data-index="index">

          <div class="icon-delete" v-if="index == levelList.length+-1" @click="deleteAppr">
            <img src="../../assets/img/appr_delete_icon.png"/>
          </div>

          <div class="icon-img-box" >
            <img :src="i.userPic" v-if=" i.userPic != '' && i.userPic != 'null' "/>
            <img src="../../assets/img/logo.png" v-else/>
          </div>
          <p>{{ i.userName }}</p>
        </div>


        <!---->
        <div class="icon-box":key="999" @click="emitAddAppr">
          <div class="icon-img-box" >
            <img src="../../assets/img/icon_add.jpg" />
          </div>
        </div>

      </transition-group>

    </div>

    <div class="item" v-if="provideObj.userName && !hideSecondBar">

      <div>发放人：</div>

      <div class="icon-box"  >
        <div class="icon-img-box" >
          <img :src="provideObj.userPic" v-if=" provideObj.userPic != '' && provideObj.userPic != 'null' "/>
          <img src="../../assets/img/logo.png" v-else/>
        </div>
        <p>{{ provideObj.userName }}</p>
      </div>
    </div>

  </div>
</template>
<script>
  import ballPulse from '@/components/loader/ballpulse'

    export default({
      name: 'chooseApprover',
      props:{
        hideSecondBar:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return {
          obj:new Array(),
          select:[],
          approverList:[],//pop list
          levelList:[],
          popPanelShow:false,//pop-panel show
          num:1,
          ballpulse_loader:true
        }
      },
      created(){
        let vm = this
        this.obj.push({ list:['呵呵','安达市','房顶上'],lv:this.num })

        //from @/components/newborrowmodule/borrowsite/apply
        vm.$root.eventHub.$on('setApprLevel',function(d){
          vm.ballpulse_loader = false
          if(d[0].status){
            d[0].status == 'error' ? vm.approverList = [] : ''
            return
          }
          vm.approverList = d

        })
      },
      methods:{
        deleteAppr(){
          this.levelList.pop()
//          this.num > 1 ? this.num-- : ''
        },
        emitAddAppr(){
          this.$root.eventHub.$emit('addAppr',{ level:this.level })
          this.popPanelShow = true
          this.approverList = []
          this.ballpulse_loader = true
        },
        setLevel(i){
          this.levelList.push(i)
          this.popPanelShow = false
        },
        popClose(){
          this.popPanelShow = false
          this.approverList = []
        },


        beforeEnter:function(el){
          el.style.opacity = '0'
        },
        enter:function(el){
          var delay = el.dataset.index * 100
          setTimeout(function () {
            el.style.opacity = '1'
          }, delay)
        },
        beforeLeave(el){
          el.style.opacity = '0'
        }
      },
      computed:{
        level(){
          return this.levelList.length < 4 ? this.levelList.length : 4
        },
        provideObj(){
          return this.levelList[this.levelList.length-1] || {}
        }
      },
      beforeDestroy(){
        this.$root.eventHub.$off('setApprLevel')
      },
      components:{
        m_ballPulse:ballPulse
      }
    })
</script>
<style scoped>
  .select , .select option{
    border:none;
    background:#fff;
  }
  .pop-panel{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:#fff;
    z-index:999;
  }
  .icon-box .icon-delete{
    position:absolute;
    width:1.2rem;
    height:1.2rem;
    border-radius:50%;
    top:0;
    right:0.7rem;
    overflow:hidden;
  }
  .icon-delete img{
    width:100%;
    height:100%;
    display:block;
  }

  .pop-item{
    width:100%;
    display:flex;
    align-items:center;
    padding:0.5rem 1rem;
    border-bottom:1px solid #e3e3e3;
  }
  .pop-item > div{
    width:3rem;
    height:3rem;
    border-radius:50%;
    overflow: hidden;
  }
  .pop-item > div > img{
    width:100%;
  }
  .pop-item > span{
    margin-left: 0.5rem;
  }



  .item{
    display: block;
  }
</style>
