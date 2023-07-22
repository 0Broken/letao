<template>
    <div>
        <van-search placeholder="请输入搜索关键词" v-model="keyWord" show-action />
        <van-sidebar v-model="activeKey">
            <van-sidebar-item title="全部" />
            <van-sidebar-item title="商品 1" />
            <van-sidebar-item title="商品 2" />
            <van-sidebar-item title="商品 3" />
            <van-sidebar-item title="商品 4" />
            <van-sidebar-item title="日常" />
        </van-sidebar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            forbidInfinite: false, //禁止无限滚动
            activeKey: 0,  // 0: 全部, 1: 衣, 2: 食, 3: 住, 4: 行
            totalData: [],
            currentData: [undefined],
            page: 1,
            source: null, // 防止频繁切换tab重复请求，存放取消的请求方法
            keyWord: ''
        }
    },
}
</script>

<style lang="scss" scoped></style>