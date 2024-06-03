<template>
    <div>
      <nav-bar>
        <template v-slot:default>分类页面</template>
      </nav-bar>

      <div id="main-box">
        <div class="order-tab" >
          <van-tabs v-model="activeTab" @click="tabClick" ref="banRef">
            <van-tab title="销量排序"></van-tab>
            <van-tab title="价格排序"></van-tab>
            <van-tab title="评分排序"></van-tab>
          </van-tabs>
      </div>

        <van-sidebar class="left-menu" v-model="activeKey">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="item in categories" :title="item.name" :name="item.id" :key="item.id">
              <van-sidebar-item
                  v-for="itemInner in item.children"
                  :title="itemInner.name"
                  :key="itemInner.id"
                  @click="getGoods(itemInner.id)"
              />
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
        <div class="goods-list">
          <div class="content">
            <van-card
                v-for="item in showGoods"
                :key="item.id"
                @click="itemClick(item.id)"
                :num="item.comments_count"
                :tag="item.comments_count >=0?'流行':'标签'"
                :price="item.price"
                :desc="item.updated_at"
                :title="item.title"
                :thumb="item.cover_url"
                :lazy-load="true"

            />
          </div>
        </div>
      </div>
      <back-top @bTop="bTop" v-show="isShowBack"></back-top>
    </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import {getCategory,getCategoryGoods} from "@/network/category";
import PullUp from '@better-scroll/pull-up'
import BackTop from '@/components/common/backTop/BackTop.vue'
import BScroll from "@better-scroll/core";
import {useRouter} from "vue-router";

export default {
  components: {
    NavBar,
    BackTop
  },
  setup(){
    const router = useRouter();

    let activeKey = ref(0);
    const activeName = ref(1);
    const activeTab = ref(1);
    let categories = ref([]);
    let currentOrder = ref('sales');
    let currentCid = ref(0)
    let bScroll = reactive({})
    let isShowBack = ref(false)
    const banRef = ref(null)
    BScroll.use(PullUp)
    //数据模型

    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]},
    });

    const showGoods = computed(()=>{
      return goods[currentOrder.value].list
    })
     const init = ()=>{
       getCategoryGoods('sales',currentCid.value).then(res=>{
         goods.sales.list = res.goods.data
       })
       getCategoryGoods('price',currentCid.value).then(res=>{
         goods.price.list = res.goods.data
       })

       getCategoryGoods('comments_count',currentCid.value).then(res=>{
         goods.comments_count.list = res.goods.data
       })
     }
     onMounted(()=>{
       getCategory().then(res=>{
         categories.value = res.categories;

       })
       init()


       bScroll = new BScroll(document.querySelector('.goods-list'),{
         probeType: 3, // 0,1,2,3  3-->只要在运动就会触发scroll事件
         click: true, // 是否允许点击
         pullUpLoad:true //上拉加载更多
       });

       bScroll.on('scroll', (position)=>{
         isShowBack.value =  (-position.y) > 90
       })

       // 上拉加载事件
       bScroll.on('pullingUp',()=>{

         const page = goods[currentOrder.value].page + 1;

         getCategoryGoods(currentOrder.value,currentCid.value,page).then(res=>{
           goods[currentOrder.value].list.push(...res.goods.data);
           goods[currentOrder.value].page  = page;
           console.log('当前类型'+ currentOrder.value,'页'+ page)
           bScroll.finishPullUp()
           bScroll.refresh();

         })

       })
     })
    watchEffect(()=>{
      nextTick(()=>{
        //重新计算高度
        bScroll && bScroll.refresh();
      })
    })

    // 排序选项卡
    const tabClick = (index)=>{
      console.log(index)
      let orders = ['sales', 'price', 'comments_count'];
      currentOrder.value = orders[index]
      getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
        goods[currentOrder.value].list = res.goods.data
        nextTick(()=>{
          //重新计算高度
          bScroll && bScroll.refresh();
        })

      })
    }
    // 通过分类get商品
    const getGoods = (cid)=>{
      currentCid.value = cid
      init()
    }
    const bTop = ()=>{
      bScroll.scrollTo(0,0,500)
    }
    const itemClick =(id)=>{
          router.push({path:'/detail',query:{id}})
    }
    return{
      itemClick,
      activeKey,
      categories,
      activeName,
      activeTab,
      tabClick,
      currentOrder,
      getGoods,
      currentCid,
      goods,
      showGoods,
      bScroll,
      bTop,
      isShowBack
    }

  }
}
</script>

<style lang="scss" scoped>
#main-box{
  margin-top: 45px;
  .order-tab{
    height:50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right:0;
    left:130px;
  }
  .left-menu{
    position: fixed;
    top: 95px;
    left:0;
    width: 130px;
  }
  .goods-list{
    flex: 1;

    position: absolute;
    top: 100px;
    left:130px;
    right: 0;
    height: calc(100vh - 100px);
    padding: 10px;

  }

}
.van-card_thumb{
  width: 68px;
}
</style>