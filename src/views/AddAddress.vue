<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result @change-area="changeArea"
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';  
import { fetchAddAddress } from '@/api/address.js';
export default {
    data() {
        return {
            areaList,
            searchResult: [],
            userId: this.$store.state.userInfo.id,
            areaCode: ""
        }
    },
    methods: {
        changeArea(areaList) {
            this.areaCode = areaList.map(item => item.code).join('-');
            console.log(this.areaCode);
        },
        async onSave(addressData) {
            addressData.country = addressData.county
            let data = {
                ...addressData,
                fullAreaCode: this.areaCode,
                areaCode: this.areaCode.split('-')[2],
                address: addressData.addressDetail
            }
            console.log(data);
            console.log(this.areaCode);
            let message = await fetchAddAddress(this.userId, data);
            if (message) {
                Toast('地址新增成功');
                this.$router.push('/usersAddress');
            } else {
                Toast('服务器出错，请稍后再试！');
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>