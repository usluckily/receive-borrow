<template>
  <transition name="page">
    <div class="all">

      <router-view name="msg"></router-view>

      <router-view name="info" :itemInfo="itemInfo"></router-view>

      <div class="con-box">
        <div class="status-list">
          <h4 class="font1">审批信息:</h4>
          <div class="item" v-for="i in approveList.list">
            <img src="../../../assets/img/icon/icon_n_wancheng@2x.png" class="icon" v-if=" i.status != '已驳回' " />
            <img src="../../../assets/img/icon/icon_bohui@2x.png" class="icon" v-if=" i.status == '已驳回' "/>
            <div>
              <img :src="i.pic" v-if=" i.pic != '' " class="head-icon"/>
              <img src="../../../assets/img/defaultheadpic.jpg" class="head-icon" v-else/>
              <p class="font3">
                <span>
                  {{ i.status }}  {{ i.username }}
                </span>
                <span>{{ i.createtime | dateFilter }}</span>
                <span style="width:100%;">{{ i.comment }}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <f_btn style="background:none;">

        <!--my-->
        <div class="fbtn" v-if="module == 'my' && ( itemInfo.status == '1' || itemInfo.status == '2' )" @click="changeItemStatu('7')">取消</div>
        <!--my-->

        <!--dsp-->
        <div class="fbtn-box2" v-if="module == 'dsp'">
          <div class="fbtn" @click="reject" >驳回</div>
          <div class="fbtn" @click="approve()">同意</div>
        </div>
        <!--dsp-->

        <!--dff-->
        <div class="fbtn-box2" v-if="module == 'dff'">
          <div class="fbtn" @click="reject" >驳回</div>
          <div class="fbtn" @click="changeItemStatu('3')">同意</div>
        </div>
        <!--dff-->

        <!--djc-->
        <div class="fbtn-box2" v-if="module == 'djc'">
          <div class="fbtn" @click="reject" >驳回</div>
          <div class="fbtn" @click="changeItemStatu('4')">借出</div>
        </div>
        <!--djc-->

        <!--dgh-->
        <div class="fbtn" v-if="module == 'dgh'" @click="changeItemStatu('5')">已归还</div>
        <!--dgh-->

      </f_btn>
    </div>
  </transition>
</template>
<script>
  import fbtn from '@/components/common/footerbtn'
  import msg from '@/components/common/msg'

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
          itemInfo:JSON.parse(localStorage.itemInfo),
          module:this.$route.params.status,
          leaveMsg:false
        }
      },
      created(){
        let vm = this , B = vm.$store.state.BP
        let itemid = vm.$route.params.id
        let pObj = {
//          url:IF.getDataDetails,
          userid:B.userid,
          sid:B.sid,
          itemid:itemid,
          type:config.obj.type
        }

        ajax.post(IF.getDataDetails,pObj,function(d){
          vm.approveList.list = d.data;
        },['username','status','comment'])

        //
        vm.$root.eventHub.$on('leaveMsg',function(d){
          vm.leaveMsg = d
        })

      },
      methods:{
        approve(){
          let vm = this ,B = vm.$store.state.BP ,
            pObj = {
//              url:IF.approveData,
              userid:B.userid,
              sid:B.sid,
              itemid:vm.$route.params.id,
              isapprove:'1'
            }
          ajax.post(IF.approveData,pObj,function(){
            vm.$router.go(-1)
          })
        },
        changeItemStatu(status){
          let vm = this , B = vm.$store.state.BP ,
            pObj = {
//              url:IF.updateDataStatus,
              userid:B.userid,
              sid:B.sid,
              itemid:vm.$route.params.id,
              status:status
            }
          ajax.post(IF.updateDataStatus,pObj,function(d){
            vm.$router.go(-1)
          })
        },
        reject(){
          let vm = this , B = vm.$store.state.BP
          vm.$router.push({path:vm.$route.path+'/msg'})
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
      components:{
        f_btn:fbtn,
        m_sg:msg
      }
    })
</script>
<style >

</style>
