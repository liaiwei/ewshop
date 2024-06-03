<template>
    <div>
      <nav-bar>
        <template v-slot:default>商品详情:{{id}}</template>
      </nav-bar>
      <van-image
          style="margin-top: 50px"
          width="100%"
          :src="detail.cover_url"
      />
      <van-card
          style="text-align: left"
          :num="detail.stock"
          :price="detail.price + '.00'"
          :desc="detail.description"
          :title="detail.title"
      >
        <template #tags>
          <van-tag plain type="danger">新书</van-tag>
          <van-tag plain type="danger">推荐</van-tag>
        </template>
        <template #footer>
          <van-button type="warning">加入购物车</van-button>
          <van-button type="danger">立即购买</van-button>
        </template>
      </van-card>

      <van-tabs v-model:active="active">
        <van-tab title="概述">
          <div class="content" v-html="detail.details"></div>
        </van-tab>
        <van-tab title="热评">
          <div v-for="item in detail.comments">
            {{item}}
          </div>
        </van-tab>
        <van-tab title="相关图书">
          <goods-list :goods="like_goods"></goods-list>
        </van-tab>
      </van-tabs>
    </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { useRoute } from "vue-router";
import {getDetail} from "@/network/detail";
import {onMounted, reactive, ref,toRefs} from "vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
export default {
  components: {GoodsList, NavBar},
  setup(){
    const route = useRoute();
    let id = ref(0);
    const active = ref(0)
    let book = reactive({
      detail:{},
      like_goods:[]
    })
    id.value = route.query.id;

    onMounted(()=>{
      getDetail(id.value).then(res=>{
        console.log(res)
          book.detail = res.goods;
          book.like_goods = res.like_goods
      })
    })

    return{
      id,
      active,
      ...toRefs(book)
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding: 10px 15px;
  margin-bottom: 45px;
  img{
    max-width: 100%;
    height: auto;
  }
}
</style>