<template>
    <div class="goodsinfo-container">
        <div class="card">
            <img class="goodsimg" @click="previewImage" :src="goodsInfo.img_url" alt="">
        </div>
        <div class="card">
            <div class="sell_price">
                <span>&yen; {{ goodsInfo.sell_price }}</span>
                <span>&yen; {{ goodsInfo.market_price }}</span>
            </div>
            <div class="tille">
                <p class="van-multi-ellipsis--l2">{{ goodsInfo.title }}</p>
            </div>
        </div>
        <div class="card">
            <van-divider>介绍</van-divider>
            <div class="content" v-html="goodsInfo.content"></div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="cart-o" text="购物车" />
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-button type="warning" text="加入购物车" @click="addCart" />
            <van-action-bar-button type="danger" text="立即购买" @click="handleBuy" />
        </van-action-bar>
        <van-popup v-model:show="show" round position="bottom" :style="{ height: '55%' }">
            <div class="box">
                <div>
                    <img :src="goodsInfo.img_url" alt="">
                    <div>
                        <div class="price">￥{{ goodsInfo.market_price }}</div>
                        <div class="residue">剩余{{ goodsInfo.stock_quantity }}件</div>
                        <div class="choose">请选择</div>
                    </div>
                </div>
                <div>
                    <p>购买数量</p>
                    <div><van-stepper v-model="value" /></div>
                </div>
                <van-divider>其他信息</van-divider>
                <div>
                    <p>商品货号: {{ goodsInfo.goods_no }}</p>
                    <p>卖出情况: {{ goodsInfo.buy }}件</p>
                    <p>上架时间: {{ goodsInfo.add_time }}</p>
                </div>
            </div>
            <van-action-bar>
                <van-action-bar-button type="warning" text="加入购物车" v-show="showButton" @click="skuAddCart" />
                <van-action-bar-button type="danger" text="立即购买" :class="{ style: !showButton }" @click="skuBuy" />
            </van-action-bar>
        </van-popup>
    </div>
</template>

<script>
import { fetchGoodsInfo } from '@/api/request.js';
import { ImagePreview, Toast } from 'vant';
export default {
    data() {
        return {
            id: this.$route.params.id,
            goodsInfo: {},
            show: false,
            value: 1,
            showButton: true
        }
    },
    methods: {
        previewImage() {
            ImagePreview({
                images: [
                    this.goodsInfo.img_url
                ],
            });
        },
        async _fetchGoodsInfo() {
            let { message } = await fetchGoodsInfo(this.id);
            this.goodsInfo = message;

        },
        addCart() {
            if (this.$store.getters.getToken === "") {
                Toast('请先进行登录');
                this.$router.push('/login');
                return
            }
            this.show = true;
            this.showButton = true;
        },
        handleBuy() {
            if (this.$store.getters.getToken === "") {
                Toast('请先进行登录');
                this.$router.push('/login');
                return
            }
            this.show = true;
            this.showButton = false
        },
        skuAddCart() {
            let cartItem = {
                goodsId: this.goodsInfo.id,
                sell_price: this.goodsInfo.sell_price,
                selectNum: this.value,
                selected: true
            }
            this.$store.commit('addCartDatas', cartItem);
            this.show = false
        },
        skuBuy() {
            let cartItem = {
                goodsId: this.goodsInfo.id,
                sell_price: this.goodsInfo.sell_price,
                selectNum: this.value,
                selected: true
            }
            this.$store.commit('addCartDatas', cartItem);
            this.$router.push('/shopcar');
        }
    },
    created() {
        this._fetchGoodsInfo();
    },
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #f0ecef;
    height: 100vh;
    padding: 5px;
    margin-bottom: 50px;

    .card {
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 6px;
        padding: 6px;
        box-sizing: border-box;

        .goodsimg {
            width: 100%;
            height: 260px;
        }

        .van-swipe {
            height: 250px;
            text-align: center;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .sell_price {
            margin-bottom: 5px;

            :nth-of-type(1) {
                color: #cc726b;
                font-size: 20px;
                margin-right: 20px;
            }

            :nth-of-type(2) {
                color: #727172;
                text-decoration: line-through;
            }
        }

        .title {
            font-size: 18px;
            color: #555449;
        }

        .content {
            padding-bottom: 50px;

            ::v-deep table {
                width: 100%;
            }

            ::v-deep img {
                height: 100%;
                width: 100%;
                display: block;
            }
        }

        .van-divider {
            font-size: 16px;
        }
    }

    .message {
        padding-left: 15px;

        p {
            margin-bottom: 5px;
        }
    }

    :deep(.van-swipe__track) {
        width: 100%;

        :deep(.van-swipe-item) {
            width: 100%;
        }
    }

    :deep(.van-popup) {
        padding: 20px;
        box-sizing: border-box;
    }

    .box {
        >div:nth-of-type(1) {
            display: flex;

            img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
            }

            >div {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                div {
                    margin-top: 6px;
                }

                .price {
                    color: #b4122f;
                    font-weight: bold;
                    font-size: 20px;
                }

                .residue {
                    color: #7e7d7d;
                    font-size: 14px;
                }

                .choose {
                    color: #7e7d7d;
                    font-size: 14px;
                }
            }
        }

        >div:nth-of-type(2) {
            display: flex;
            justify-content: space-between;
            align-items: center;

            p {
                color: #7e7d7d;
            }
        }

        .van-divider {
            margin: 0;
        }

        >div:nth-of-type(4) {
            margin-top: 10px;

            p {
                margin: 5px 0;
                color: #7e7d7d;
                font-size: 15px;
            }
        }
    }

    .style {
        border-radius: 30px;
        margin-left: 5px;
    }
}
</style>