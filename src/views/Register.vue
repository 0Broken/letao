<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="repassword" type="password" name="repassword" label="重复密码" placeholder="重复密码"
                :rules="[{ required: true, message: '请填写重复密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { fetchRegister } from '@/api/user.js';
import { Toast } from 'vant';

export default {
    data() {
        return {
            username: '',
            password: '',
            repassword: ''
        };
    },
    methods: {
        async onSubmit(values) {
            if (this.password !== this.repassword) {
                Toast('两次密码不一致')
                return;
            }
            let { status, message } = await fetchRegister(values);
            Toast(message);
            if (status === 0) {
                this.$router.push('/login');
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>