<template>
  <div class="home">
    <h1>首页</h1>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getHomeAllData } from '@/network/home';
export default {
  name: 'HomeView',
  setup(){
    const banner = ref([]);
    onMounted(()=>{
      getHomeAllData().then(res=>{
        banner.value = res.slider;
      })
      
    })
  }
  
}
</script>
