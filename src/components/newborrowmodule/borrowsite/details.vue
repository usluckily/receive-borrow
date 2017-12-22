<template>
  <transition name="page">
    <div class="all">

      <replayBox :show=" rboxShow "></replayBox>

      <router-view name="info" :itemInfo="itemInfo"></router-view>

      <div class="con-box">
        <div class="status-list">
          <h4 class="font1">审批信息:</h4>
          <div class="item" v-for="i in approveList.list">
            <img src="../../../assets/img/icon/icon_n_wancheng@2x.png" class="icon" v-if=" i.status != '已驳回' " />
            <img src="../../../assets/img/icon/icon_bohui@2x.png" class="icon" v-if=" i.status == '已驳回' "/>
            <div>
              <img :src="itemInfo.userPic" v-if=" itemInfo.userPic != '' " class="head-icon"/>
              <img src="../../../assets/img/defaultheadpic.jpg" class="head-icon" v-else/>
              <p class="font3">
                <span>
                  {{ i.status }}  {{ itemInfo.usreName }}
                </span>
                <span>{{ i.createtime | dateFilter }}</span>
                <span style="width:100%;">{{ i.remarks }}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <f_btn style="background:none;">

        <!--my-->
        <div class="fbtn" v-if="module == 'my' && ( itemInfo.status == '1' || itemInfo.status == '2' )" @click="changeItemStatu('4')">取消</div>
        <!--my-->

        <!--dsp-->
        <div class="fbtn-box2" v-if="module == 'dsp' && itemInfo.flag == '0'">
          <div class="fbtn" @click="changeItemStatu('3')" >驳回</div>
          <div class="fbtn" @click="changeItemStatu('2')">同意</div>
        </div>
        <!--dsp-->

      </f_btn>
    </div>
  </transition>
</template>
<script>
  import fbtn from '@/components/common/footerbtn'
  import msg from '@/components/common/msg'
  import replayBox from '@/components/common/replybox'

  import ajax from '@/assets/js/ajax'
  import config from '@/assets/js/config'
  import IF from '@/assets/js/interface'

    export default({
      name: 'rdetails',
      data(){
        return {
          approveList:{
            list:[]
          },
          itemInfo:'',
          module:this.$route.params.status,
          leaveMsg:false,
          rboxShow:false
        }
      },
      created(){
        let vm = this , B = vm.$store.state.BP
        let itemid = vm.$route.params.id
        let pObj = {
          userId:B.userid,
          sid:B.sid,
          id:itemid,
        }

        ajax.post(IF.getSiteDetails,pObj,function(d){
          vm.approveList.list = d.venuedate[0];
          vm.itemInfo = d.applyVenue
        },['username','status','comment'])

        //
        vm.$root.eventHub.$on('leaveMsg',function(d){
          vm.leaveMsg = d
        })

        //
        vm.$root.eventHub.$on('rbox-close',function(){
          vm.rboxShow = false
        })
      },
      methods:{
        changeItemStatu(status){
          let vm = this , B = vm.$store.state.BP ,
            pObj = {
              userId:B.userid,
              sid:B.sid,
              id:vm.$route.params.id,
              status:status,
              applyContent:''
            }


          vm.rboxShow = true

          vm.$root.eventHub.$on('rbox-ok',function(d){

            pObj.applyContent = d.reply

            ajax.post(IF.siteApprove,pObj,function(d){

              vm.$root.eventHub.$emit('promptOpen',{ content:'操作成功!' })

//              vm.updateList()//本地更新list

              vm.$root.eventHub.$emit('updateList')

              vm.$router.go(-1)
            })

            vm.rboxShow = false

          })

        },
        cancel(){

        }
      },
      filters:{
        dateFilter(val){
          if(val){
            return val.split('.')[0]
          }
        }
      },
      beforeDestroy(){
        this.$root.eventHub.$off('rbox-close')
      },
      watch:{
        rboxShow(val){
          let vm = this
          if(val == false){
            vm.$root.eventHub.$off('rbox-ok')
          }else{
            return
          }
        }
      },
      components:{
        f_btn:fbtn,
        m_sg:msg,
        replayBox:replayBox
      }
    })
</script>
<style >

</style>
