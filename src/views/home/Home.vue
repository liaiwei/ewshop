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
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import RecommendView from './ChildComps/RecommendView.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from './../../components/content/goods/GoodsList.vue'
import { onMounted, ref,reactive,computed } from 'vue';
import { getHomeAllData,getHomeGoods } from '@/network/home';
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

    const goods = reactive({
      sales:{page:0,list:[]},
      new:{page:0,list:[]},
      recommend:{page:0,list:[]}
    })

    let currentType = ref('sales');

    const showGoods = computed(()=>{
      return goods[currentType.value].list;
    })
    onMounted(()=>{
      getHomeAllData().then(res=>{
        recommends.value = res.goods.data;
      });

      getHomeGoods('sales').then(res=>{
          goods.sales.list = res.goods.data;
      })
      getHomeGoods('recommend').then(res=>{
        goods.recommend.list = res.goods.data;
      })
      getHomeGoods('new').then(res=>{
        goods.new.list = res.goods.data;
      })


    })
    const tabClick = (index)=>{

    }

    return{ 
      recommends,
      goods,
      tabClick,
      showGoods
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