<template>
  <div class="floatListBox" :style="{ top:localTop+'px' }" v-show="listShow">
    <ul>
      <li v-for="i in list" :data-id="i.id" :data-type="i.type" :data-itemtypeid="i.itemtypeid" @click="sendMsg(i)">{{ i.name }}</li>
    </ul>
  </div>
</template>
<script>
    export default({
      name: 'flbox',
      props:['list','top','target'],
      data(){
        return {

        }
      },
      methods:{
        sendMsg(i){
          let vm = this , type , obj
          if(i.type){
              type = i.type
          }else{
            type = false
          }
          obj = {
            id: i.id || i.goodsmanagementid || i.itemtypeid || i.userid,
            val: i.name,
            type: type,
            itemman: i.itemman
          }
          vm.$root.eventHub.$emit('setInfo',obj);
//          vm.listShow = false
        }
      },
      computed:{
        localTop(){
          let rootFontSize = document.getElementsByTagName('html')[0].style.fontSize || 20 , res

          res = parseInt(rootFontSize)*2.5 + this.top
          return res
        },
        listShow(){
          return this.list.length > 0
        }
      }
    })
</script>
<style>
  .floatListBox{
    width:100%;
    position:absolute;
    background:#fff;
    border-top:1px solid #eee;
    box-shadow:0 6px 9px #ccc;
    z-index:999;
  }
  .floatListBox li{
    line-height:2rem;
    text-indent:1rem;
    border-bottom:1px solid #eee;
  }
</style>
