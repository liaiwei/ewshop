<template>
  <div class="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <tab-control v-show="isTabFixed" :titles="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="banRef">
          <home-swiper :banners="banners"></home-swiper>
<!--          <div class="banner">-->
<!--            <img src="~assets/images/1.jpg" alt="">-->
<!--          </div>-->
          <recommend-view :recommends="recommends"></recommend-view>
        </div>

        <tab-control :titles="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
      <back-top @bTop="bTop" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import RecommendView from './ChildComps/RecommendView.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from './../../components/content/goods/GoodsList.vue'
import { onMounted, ref,reactive,computed,watchEffect,nextTick } from 'vue';
import { getHomeAllData,getHomeGoods } from '@/network/home';
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import BackTop from '@/components/common/backTop/BackTop.vue'
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper.vue";
export default {
  name: 'home',
  components:{
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper
  },
  setup(){
    let isTabFixed = ref(false)
    let isShowBack = ref(false)
    const recommends = ref([]);
    const banRef = ref(null)
    const goods = reactive({
      sales:{page:1,list:[]},
      new:{page:1,list:[]},
      recommend:{page:1,list:[]}
    })

    let currentType = ref('sales');

    const showGoods = computed(()=>{
      return goods[currentType.value].list;
    })


    let banners = ref([])
    let bScroll = reactive({})
    BScroll.use(PullUp)
    onMounted(()=>{
      getHomeAllData().then(res=>{
        recommends.value = res.goods.data;
        banners.value = res.slides;
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

       bScroll = new BScroll(document.querySelector('.wrapper'),{
         probeType: 3, // 0,1,2,3  3-->只要在运动就会触发scroll事件
         click: true, // 是否允许点击
         pullUpLoad:true //上拉加载更多
      });

      bScroll.on('scroll', (position)=>{
        // console.log(position)
        console.log(banRef.value.offsetHeight);
        isShowBack.value = isTabFixed.value = (-position.y) > banRef.value.offsetHeight
      })

      // 上拉加载事件
      bScroll.on('pullingUp',()=>{

        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value,page).then(res=>{
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page = page;
          bScroll.finishPullUp()
          console.log('当前类型'+ currentType.value,'页'+ page)
          bScroll.refresh();

        })

      })

    })
    const tabClick = (index)=>{
      let types = ['sales', 'new', 'recommend'];
      currentType.value = types[index];
      nextTick(()=>{
        //重新计算高度
        bScroll && bScroll.refresh();
      })
    }
   const bTop = ()=>{
     bScroll.scrollTo(0,0,500)
   }
    watchEffect(()=>{
      nextTick(()=>{
        //重新计算高度
        bScroll && bScroll.refresh();
      })
    })

    return{ 
      recommends,
      goods,
      tabClick,
      showGoods,
      isTabFixed,
      banRef,
      isShowBack,
      bTop,
      banners
    }
  }
  
}
</script>
<style lang="scss" scoped>
  .banner img{
    width:100%;
    height: auto;
    //margin-top: 45px;
  }
  .home{
    position: relative;
    height: 100vh;

    .wrapper{
      position: absolute;
      top: 45px;
      bottom: 50px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .content{

    }
  }
</style>