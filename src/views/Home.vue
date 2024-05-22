<template>
  <div class="home">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>图书兄弟</template>
      <template v-slot:right>图书兄弟</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { onMounted, ref } from 'vue';
import { getHomeAllData } from '@/network/home';
export default {
  name: 'Home',
  components:{
    NavBar
  },
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
