<template>
    <div class="goods">
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
        <goods-list-item></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default{
    name:"GoodsList",
    components:{
        GoodsListItem
    }
}
</script>


<style lang="scss" scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
}
</style>