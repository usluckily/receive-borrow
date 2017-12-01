<template>

  <div class="all">

    <div>
      <input type="radio" disabled/>
      <input type="radio" disabled/>
      <input type="radio" checked/>
      <input type="radio" disabled/>
    </div>

    <div class="box" v-for="i in obj2.titList">

      <div class="tit">{{ i.tit }}</div>

      <span v-for="j in obj2.list" v-bind:type=" i.type " @click="choose(i.type,j,$event)"> {{ j }} </span>

    </div>

    <div class="fbtn-box">
      <div @click="testsub" class="fbtn">click</div>
    </div>

  </div>

</template>
<script>
  import $ from 'jquery'

    export default({
      name: 'Ftest',
      data(){
        return {
          obj2:{
            titList:[
              {
                tit:'标题1',
                type:1
              },
              {
                tit:'标题2',
                type:2
              },
              {
                tit:'标题3',
                type:3
              }
            ],
            list:['评价1','评价2','评价3']
          },
          testSub:[]
        }
      },
      methods:{
        choose(type,j,e){

          $(e.target).parent().find('span').css({color:''})
          $(e.target).css({color:'green'})

          for(var i in this.testSub){
            if(this.testSub[i].type == type){

              this.testSub[i] = {
                type:type,
                val:j
              }

              return

            }
          }

          this.testSub.push({
            type:type,
            val:j
          })


        },
        testsub(){
          alert(JSON.stringify(this.testSub))
        },
      }
    })
</script>
<style>

</style>
