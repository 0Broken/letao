<template>
    <div class="goodslist">
        <Goods v-for="(item, index) in goodslist" :data="item"></Goods>
    </div>
</template>

<script>
import { fetchShopList } from "@/api/request.js";
import Goods from '@/components/Goods.vue';
export default {
    created() {
        this._fetchShopList();
    },
    data() {
        return {
            goodslist: [],
        }
    },
    methods: {
        async _fetchShopList() {
            let { message } = await fetchShopList(12);
            this.goodslist = message
        },
    },
    components: {
        Goods
    }
}
</script>

<style lang="scss" scoped>
.goodslist {
    padding-top: 5px;
    background-color: #ebebeb;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>