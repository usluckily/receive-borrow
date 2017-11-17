<template >
  <transition name="modal">

    <div class="modalBox" @click='modalFunc().close();' v-show="modal.show" v-cloak>
      <div class="modal" onclick="event.stopPropagation();">
        <h4 class="modalHeader">提示</h4>
        <div class="modalContent">{{ modal.content }}</div>
        <div class="modalFooter clearfix">
          <div class="modalBtn" @click="cancel()" id= "modalCancel" >取消</div>
          <div class="modalBtn"  @click="modal.callback()" id="modalSure" >确定</div>
        </div>
      </div>
    </div>

  </transition>



</template>
<script>
  import $ from 'jquery'
  export default {
    name:'modal',
    props:['parentModal'],//接收父组件传递的类名为parentModal对象
    data () {
      return {
        modal:this.parentModal,//父组件article,pageone
      }
    },
    methods:{
      modalFunc:function(){
        var modal = this.modal;
        $('.modalBox .modalBtn').on('touchstart',function(){
          $(this).addClass('modalBtnBgGray');
        });
        $('.modalBox .modalBtn').on('touchend',function(){
          $(this).removeClass('modalBtnBgGray');
        });
        return {
          show: function(contentText){
            modal.show = true;
//                $('.modalBox .modalHeader').text(headText);
            $('.modalBox .modalContent').text(contentText);

          },
          close: function(){
            modal.show = false;
          }
        }
      },
      affirm (callback,id) {
        if(callback){
          callback(true,id);
        }
        this.modalFunc().close();
      },
      cancel (callback,id) {
        if(callback){
          callback(false,id);
        }
        this.modalFunc().close();
      },
      addBook (x,id){
//        alert(id);
      }
    },
    created (){
//
    }
  }
</script>
<style scoped>
  /*modal*/
  .modalBox{position:fixed;width:100%;height:100%;top:0;left:0;z-index:102;}
  .modal{width:13rem;margin:-3rem auto 0;top:50%;background:#fff;position:relative;border-radius:0.4rem;overflow:hidden;transition:transform 0.4s ease;}
  .modal .modalHeader,.modal .modalContent,.modal .modalFooter{text-align:center;}
  .modal .modalHeader{font-size:0.9rem;padding:1em 0.5rem 0.2rem 0.5rem;}
  .modal .modalContent{font-size:0.8rem;padding:0 0.5rem 1rem 0.5rem;}
  .modal .modalFooter{border-top:1px solid #e2e2e2;padding:0;line-height:1.8rem;}
  .modal .modalFooter .modalBtn{float:left;width:50%;height:100%;font-size:0.8rem;}
  .modal .modalFooter .modalBtn:first-child{border-right:1px solid #e2e2e2;}
  .modalBtnBgGray{background:#e2e2e2;}

  /*.modal-enter-active{*/
    /*transition:transform,opacity 0.5s,0.5s ease,ease;*/
    /*transform: translateZ(100px);*/
    /*opacity:1;*/
  /*}*/
  /*.modal-enter{*/
    /*transform: translateZ(120px);*/
    /*opacity:0;*/
  /*}*/
  /*.modal-leave-active{*/
    /*transition:transform,opacity 0.3s,0.3s ease,ease;*/
    /*transform: translateZ(120px);*/
    /*opacity:1;*/
  /*}*/
  /*.modal-leave{*/
    /*transform: translateZ(100px);*/
    /*opacity:0;*/
  /*}*/

  .modal-enter{
    /*transition:opacity 0.5s ease;*/
    opacity:0;
  }
  .modal-enter .modal{
    transform: translateZ(110px);
  }

  .modal-enter-active{

    opacity:1;
  }
  .modal-enter-active .modal{
    transform: translateZ(100px);
  }

  .modal-leave{
    opacity:1;
  }
  .modal-leave .modal{
    transform: translateZ(100px);
  }

  .modal-leave-active{
    transition:opacity 0.3s ease;
    opacity:0;
  }
  .modal-leave-active .modal{
    transform: translateZ(110px);
  }


</style>
