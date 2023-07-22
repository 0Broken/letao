<template>
    <div>
        <van-address-list @select="select" v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd"
            @edit="onEdit" />
        <van-empty v-if="!list.length" description="无收获地址" />
    </div>
</template>

<script>
import { fetchGetAddress, fetchUpdateAddress } from '@/api/address.js';
import { Toast } from 'vant';

export default {
    data() {
        return {
            chosenAddressId: '',
            list: [],
            userid: this.$store.state.userInfo.id
        };
    },
    methods: {
        onAdd() {
            Toast('新增地址');
            this.$router.push('/addaddress');
        },
        onEdit(item, index) {
            Toast('编辑地址');
            let data = JSON.stringify(this.list[index]); //转为字符串才可以传参数
            this.$router.push(`/editAddress/${data}`);
        },
        async _fetchGetAddress() {
            let addressAll = await fetchGetAddress(this.userid);
            let index = addressAll.findIndex(item => item.isDefault === 1);

            addressAll = addressAll.map(item => {
                if (item.isDefault) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
                return item;
            })
            if (index !== -1) {
                let defaultAddress = addressAll[index];
                // 把默认选中的id赋值到chosenAddressId上就可以被选中了
                this.chosenAddressId = defaultAddress.id;
                addressAll.splice(index, 1);
                addressAll.unshift(defaultAddress);
            } else {
                this.chosenAddressId = addressAll[0].id
                addressAll[0].isDefault = true;
            }
            this.list = addressAll;
        },
        async select(address, index) {
            address.isDefault = true
            let { status, message } = await fetchUpdateAddress(address.id, address);
            console.log(message);
            if (status === 0) {
                // location.reload();
                this.list = this.list.map((item, index2) => {
                    if (index2 !== index) {
                        item.isDefault = false
                    }
                    return item;
                })
            }
        }
    },
    created() {
        this._fetchGetAddress();
    },
}
</script>

<style lang="scss" scoped></style>