<template>
  <van-swipe v-if="banners.length" class="my-swipe" >
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img v-lazy="item.img_url" alt="">
      </van-swipe-item>
  </van-swipe>
</template>


<script>

import {onMounted} from "vue";

export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default:()=>[]
    }
  },
  setup(props){
    onMounted(()=>{
      console.log(props.banners)
    })

  }
}
</script>



<style lang="scss" scoped>
img{
  width: 100%;
  height: auto !important;
}
</style>