<template>
  <transition name="page">
    <div class="msgPage">
    <textarea class="msg font2" placeholder="说点什么吧..." v-model="note">

    </textarea>

      <f_btn style="position:relative;margin-top:3rem;">
        <div class="fbtn" @click="reject">确认</div>
      </f_btn>
    </div>
  </transition>
</template>
<script>
  import fbtn from '@/components/common/footerbtn'

  import ajax from '@/assets/js/ajax'
  import config from '@/assets/js/config'
  import IF from '@/assets/js/interface'

    export default({
      name: 'msg',
      props:['msg'],
      data(){
        return {
          note:''
        }
      },
      methods:{
        leaveMsg(){
          let vm = this , B = vm.$store.state.BP ,
            pObj = {
//              url:IF.leaveMsg,
              userid:B.userid,
              sid:B.sid,
              itemid:vm.$route.params.id,
              note:vm.note
            }
          ajax.post(IF.leaveMsg,pObj,function(){
            vm.$root.eventHub.$emit('leaveMsg',true)
            vm.reject()
          })

        },
        reject(){
          let vm = this ,
            B = vm.$store.state.BP ,
            pObj = {
//              url:IF.approveData,
              userid:B.userid,
              sid:B.sid,
              itemid:vm.$route.params.id,
              isapprove:'0',
              comment:vm.note
            }
          ajax.post(IF.approveData,pObj,function(){
            vm.leaveMsg = false
            vm.$router.go(-2)
          })
        }
      },
      components:{
        f_btn:fbtn
      }

    })
</script>
<style>
.msgPage{
  position:fixed;
  width:100%;
  height:100%;
  top:0;left:0;
  z-index:103;
  background:#F4F4F4;
}
</style>
