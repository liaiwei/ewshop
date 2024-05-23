<template>
  <div class="goods-item">
    <img src="~assets/images/2.jpg" alt="" />
    <div class="goods-info">
      <p>标题</p>
      <span class="price"> <small>￥</small>100 </span>
      <span class="collect"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
};
</script>

<style lang="scss" scoped>
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: -15px;
        width: 14px;
        height: 14px;
        top: 1px;
        background: url('~assets/images/collection.png') 0 0/14px 14px;
      }
    }
  }
}
</style>
