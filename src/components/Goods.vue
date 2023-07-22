<template>
    <div class="goods-container">
        <router-link :to="'/goodsinfo/' + data.id" class="item">
            <div class="item-img">
                <img :src="data.img_url" alt="">
            </div>
            <div class="item-title">
                {{ data.title }}
            </div>
            <div class="item-intro">
                <span class="price">￥ {{ data.sell_price }}</span>
                <span class="number">{{ data.buy }} 购买</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.goods-container {
    width: 48%;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 5px;
    box-sizing: border-box;

    .item {

        .item-title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .item-img {
            img {
                width: 100%;
                height: 150px;
            }
        }

        .item-intro {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            padding-right: 5px;
            font-size: 14px;

            .price {
                color: red;
            }

            .number {
                color: #979494;
            }
        }
    }
}
</style>