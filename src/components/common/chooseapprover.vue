<template>
  <div class="con-box">
    <div class="item" v-for="i in obj">
      <div>
        审批人 :
        <select class="select">
          <option v-for="j in i.list">{{ j }}</option>
        </select>
        <span v-if="i.lv == obj.length && i.lv != 5" @click="addAppr">+</span>
        <span v-if="i.lv == obj.length && i.lv != 1" @click="deleteAppr">-</span>
      </div>
    </div>
  </div>
</template>
<script>
    export default({
      name: 'chooseApprover',
      data(){
        return {
          obj:new Array(),
          select:[],
          num:1
        }
      },
      created(){
        this.obj.push({ list:['呵呵','安达市','房顶上'],lv:this.num })
      },
      methods:{
        addAppr(){
          this.obj.push({ list:['费大幅度','房改房','潍坊'],lv:++this.num })
        },
        deleteAppr(){
          this.obj.pop()
          this.num > 1 ? this.num-- : ''
        }
      },
      computed:{

      },
      components:{

      }
    })
</script>
<style scoped>
.select , .select option{
  border:none;
  background:#fff;
}
</style>
