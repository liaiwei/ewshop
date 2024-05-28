<template>
    <div>
      <nav-bar>
        <template v-slot:default>分类页面</template>
      </nav-bar>

      <div id="main-box">
        <div class="order-tab">
          <van-tabs v-model="activeTab">
            <van-tab title="销量排序"></van-tab>
            <van-tab title="价格排序"></van-tab>
            <van-tab title="评分排序"></van-tab>
          </van-tabs>
      </div>

        <van-sidebar class="left-menu" v-model="activeKey">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="item in categories" :title="item.name" :name="item.id" :key="item.id">
              <van-sidebar-item v-for="itemInner in item.children" :title="itemInner.name" :key="itemInner.id" />
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
        <div class="goods-list">

        </div>
      </div>
    </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import {onMounted, ref} from "vue";
import {getCategory} from "@/network/category";

export default {
  components: {NavBar},
  setup(){
    let activeKey = ref(0);
    const activeName = ref(1);
    const activeTab = ref(1);
    let categories = ref([])
     onMounted(()=>{
       getCategory().then(res=>{
         categories.value = res.categories;

       })
     })
    return{
      activeKey,
      categories,
      activeName,
      activeTab
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
  }

}
</style>