<template>
  <div class="backTop" @click="backTop"></div>
</template>

<script>
export default {
  name:'BackTop',
  setup(props,{emit}){

    return{
      backTop: ()=>{
        emit('bTop')
      }
    }
  }
}
</script>


<style scoped lang="scss">
.backTop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 20;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("~assets/images/up.png");
  background-color: #fcfcfc;
}
</style>