<template>
  <div class="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <div class="banner">
      <img src="~assets/images/1.jpg" alt="">
    </div>
    <recommend-view :recommends="recommends"></recommend-view>
    <tab-control :titles="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>
    <goods-list></goods-list>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import RecommendView from './ChildComps/RecommendView.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from './../../components/content/goods/GoodsList.vue'
import { onMounted, ref } from 'vue';
import { getHomeAllData } from '@/network/home';
export default {
  name: 'Home',
  components:{
    NavBar,
    RecommendView,
    TabControl,
    GoodsList
  },
  setup(){
    const recommends = ref([]);
    
    onMounted(()=>{
      getHomeAllData().then(res=>{
        recommends.value = res.goods.data;
      })
    })
    const tabClick = (index)=>{

    }

    return{
      recommends
    }
  }
  
}
</script>
<style lang="scss" scoped>
  .banner img{
    width:100%;
    height: auto;
    margin-top: 45px;
  }
</style>