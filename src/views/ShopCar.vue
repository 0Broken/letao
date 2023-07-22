<template>
    <div class="shopCart_container" :class="[shopCartList.length ? 'gray' : 'white']">
        <template v-if="shopCartList.length">
            <div class="address" v-if="address" @click="$router.push('/useraddress')">
                <van-icon name="location-o" color="#ee0a24" />
                <div class="address_info">
                    <div>姓名:{{ address.name }} / 电话:{{ address.tel }}</div>
                    <div class="van-ellipsis">地址:{{ address.province }}{{ address.country }}{{ address.city }}{{
                        address.addressDetail }}</div>
                </div>
            </div>
            <div class="addAddress" v-if="!address" @click="$router.push('/addaddress')">添加地址</div>
        </template>
        <div class="item" v-for="(item, index) in shopCartList" :key="item.id">
            <van-checkbox @click="changeState(item.id, $store.getters.getGoodsSelected[item.id])"
                v-model="$store.getters.getGoodsSelected[item.id]" checked-color="#ee0a24" />
            <div class="imgWrap">
                <img :src="item.img_url" alt="">
            </div>
            <div class="info">
                <div class="title ellipsis_l1">{{ item.title }}</div>
                <div class="price">
                    <div class="sell_price">&yen;{{ item.sell_price }}</div>
                    <van-stepper @change="changeNumber($event, item.id)" v-model="$store.getters.getGoodsNumber[item.id]"
                        theme="round" button-size="22" disable-input />
                    <van-button type="danger" @click="delCartList(index, item.id)">删除</van-button>
                </div>
            </div>
        </div>
        <van-submit-bar :style="{ bottom: isTrue ? '50px' : '0px' }" :price="$store.getters.getTotalPrice * 100"
            button-text="提交订单" @submit="onSubmit" :disabled="shopCartList.length == 0">
            <template #tip>
                仅支持微信支付
            </template>
            <template #default>
                选中<span style="color:red">{{ $store.getters.getTotalNumber }}</span>商品
            </template>
        </van-submit-bar>
        <van-empty v-if="!shopCartList.length" description="占无订单" />
    </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { fetchShopCarList } from '@/api/request';
import { fetchGetAddress } from '@/api/address';
import { getOrderId } from '@/tool/orderId.js'
import { fetchCommitOrder } from '@/api/order.js';
export default {
    data() {
        return {
            shopCartList: [],
            checked: "",
            value: "",
            ids: this.$store.getters.getIds,
            gray: 'gray',
            white: 'white',
            address: null,
            userId: this.$store.state.userInfo.id,
            // bottomStyle: "bottom",
            bottomStyle: { bottom: '50px' },
            isTrue: true
        }
    },
    created() {
        this._fetchShopCarList();
        this._fetchGetAddress();
    },
    methods: {
        async _fetchShopCarList() {
            if (this.ids !== "") {
                let { message } = await fetchShopCarList(this.ids);
                this.shopCartList = message;
            }
        },
        async onSubmit() {
            let index = this.$store.state.cartDatas.findIndex(item => item.selected === true);
            if (index === -1) {
                Toast('请先选中要买的商品');
                return
            }
            let orderData = {
                user_id: this.userId,
                order_id: getOrderId(),
                address_id: this.address.id,
                total_price: this.$store.getters.getTotalPrice,
                number: this.$store.getters.getCarSelectedTotalNumber,
                goods_ids: this.$store.getters.getCarSelectedGoodsIds
            }
            Dialog.confirm({
                title: '购物车',
                message: '确定要提交订单吗',
            }).then(async () => {
                Toast.loading({
                    message: '下单中...',
                    forbidClick: true,
                });
                let { status } = await fetchCommitOrder(orderData);
                this.$store.commit('clearSelectedOredr');
                if (status === 0) {
                    Toast('下单成功');
                    this.$router.replace('/orderList');
                }
            }).catch(() => {
                Toast('已取消');
            });
        },
        changeState(id, checked) {
            this.$store.commit('changeState', { id, checked });
        },
        delCartList(index, id) {
            console.log(index, id);
            Dialog.confirm({
                title: '购物车',
                message: `确定删除订单吗？`,
            }).then(() => {
                this.shopCartList.splice(index, 1);
                this.$store.commit('delCartDates', id);
            }).catch(() => {
                Toast('已取消');
            });
        },
        changeNumber(value, id) {
            this.$store.commit('changeNumber', { value, id });
        },
        async _fetchGetAddress() {
            let data = await fetchGetAddress(this.userId);
            let index = data.findIndex(item => {
                return item.isDefault == true;
            })
            if (index !== -1) {
                this.address = data[index];
            } else {
                this.address = data[0];
            }
        }
    },
    watch: {
        $route() {
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss" scoped>
.gray {
    background-color: #f0ecef;
}

.white {
    background-color: #fff;
}

.shopCart_container {
    height: 100vh;
    padding: 5px;

    .address {
        background-color: #fff;
        border-radius: 8px;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .van-icon {
            font-size: 20px;
        }

        .address_info {
            width: 90%;
            font-size: 14px;

            div:nth-of-type(1) {
                margin-bottom: 5px;
            }
        }
    }

    .addAddress {
        background-color: #fff;
        text-align: center;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 5px;
    }

    .item {
        background-color: #fff;
        height: 90px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 5px;

        .imgWrap {
            width: 60px;
            height: 60px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info {
            width: 65vw;
            height: 70%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .price {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .sell_price {
                    width: 22%;
                    font-size: 18px;
                    color: #f0082b;
                }

                .van-button {
                    height: 36px;
                }
            }
        }
    }
}
</style>