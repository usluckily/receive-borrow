<template>
  <div style="position:absolute;width:100%;height:100%;background:#000">
    <m_rotate :percent="x" tit="及格率" ></m_rotate>
  </div>
</template>
<script>
  import rotate from '@/components/test/rotate'

    export default({
      name: 'test',
      data(){
        return {
          x:'70'
        }
      },
      created(){
        let vm = this
        setTimeout(function(){
          vm.x = '20'
        },5000)
      },
      components:{
        m_rotate:rotate
      }
    })
</script>
<style scoped>

</style>
