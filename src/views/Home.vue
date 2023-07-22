<template>
    <div class="home-container">
        <template v-if="showHome">
            <div class="search">
                <div class="logo">
                    <img src="../assets/images/logo(1).png" alt="">
                </div>
                <van-search @focus="$router.push('/home/search')" v-model="value" placeholder="请输入搜索关键词" />
            </div>
            <div class="banner-container">
                <van-swipe :autoplay="3000" lazy-render>
                    <van-swipe-item v-for="item in bannerList" :key="item">
                        <img :src="item.img" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="display">
                <van-grid square>
                    <van-grid-item v-for="item in grid" :key="item" :to="item.url">
                        <img :src="item.img" alt="">
                        <span>{{ item.text }}</span>
                    </van-grid-item>
                </van-grid>
            </div>
            <van-divider>推荐商品</van-divider>
            <div class="recommend">
                <Goods v-for="item in recommendList" :data="item"></Goods>
            </div>
        </template>

        <router-view></router-view>
    </div>
</template>

<script>
import { fetchBanner, fetchRecommend } from '@/api/request.js';
import Goods from '@/components/Goods.vue';
export default {
    components: {
        Goods
    },
    created() {
        this._fetchBanner();
        this._fetchRecommend();
    },
    data() {
        return {
            value: '',
            bannerList: [],
            showHome: true,
            grid: [
                { img: require('@/assets/images/menu10.png'), text: '其他商品', url: '/allgoods' },
                { img: require('@/assets/images/menu10.png'), text: '数码电器', url: '/goodslist' },
                { img: require('@/assets/images/menu18.png'), text: '今日头条' },
                { img: require('@/assets/images/menu12.png'), text: '美图欣赏' },
                { img: require('@/assets/images/menu15.png'), text: '9.9元拼单' },
                { img: require('@/assets/images/menu12.png'), text: '话费充值' },
                { img: require('@/assets/images/menu16.png'), text: '物流查询' },
                { img: require('@/assets/images/menu17.png'), text: '查看更多' },
            ],
            recommendList: []
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.name !== 'home') {
            this.showHome = false
        } else {
            this.showHome = true
        }
        next();
    },
    methods: {
        async _fetchBanner() {
            let { message } = await fetchBanner();
            this.bannerList = message;
        },
        async _fetchRecommend() {
            let { message } = await fetchRecommend();
            this.recommendList = message;

        },
        onSearch() {

        },
        onClickButton() {

        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    background-color: #ebebeb;

    .search {
        background-color: #fff;
        display: flex;
        align-items: center;
        padding-left: 8px;

        .logo {
            img {
                width: 55px;
                height: 35px;
            }
        }

        .van-search {
            flex: 1;
        }
    }

    .banner-container {

        .van-swipe {
            height: 160px;

            .van-swipe-item {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .display {
        img {
            width: 40px;
            height: 40px;
        }
    }

    .van-divider {
        background-color: #fff;
        margin: 0;
        padding: 10px 0;
        font-size: 18px;
    }

    .recommend {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 8px;
        margin-bottom: 50px;
    }
}
</style>