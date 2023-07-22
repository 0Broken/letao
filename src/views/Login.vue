<template>
    <div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <div class="style" @click="jumpRegister">没有账号，立即注册</div>
    </div>
</template>

<script>
import { fetchLogin } from '@/api/user.js';
import { Toast } from 'vant';
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async onSubmit(values) {
            console.log('submit', values);
            let { message, status, token, userInfo } = await fetchLogin(values);
            Toast(message);
            if (status === 0) {
                this.$store.commit('changeToken', token);
                this.$store.commit('getUserInfo', userInfo);
                let { redirect } = this.$route.query;
                if (redirect) {  //判断是否有redirect，如果有就跳转到这个路由去，没用就跳转到/home首页去
                    // this.$router.push(redirect);
                    this.$router.push('/home');
                } else {
                    this.$router.push('/home');
                }
            }
        },
        jumpRegister() {
            this.$router.push('/register');
        }
    }
}
</script>

<style lang="scss" scoped>
.style {
    text-align: center;
    color: #aaa9a9;
}
</style>