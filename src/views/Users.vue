<template>
    <div class="user_container">
        <van-cell-group :border="false">
            <div class="header">
                <div class="imgWrap">
                    <img src="../assets/images/logo(1).png" alt="">
                </div>
                <div class="usersname">
                    用户名：{{ $store.state.userInfo.username }}
                </div>
            </div>
            <van-cell title="修改密码" is-link />
            <van-cell title="我的订单" is-link @click="$router.push('/orderlist')" />
            <van-cell title="收货地址" is-link @click="$router.push('/useraddress')" />
            <van-cell title="建议留言" is-link />
            <van-cell title="设置" is-link />
            <van-cell title="关于乐淘" value="2.0.1" />
        </van-cell-group>
        <van-button type="danger" block @click="exit">退出登录</van-button>
    </div>
</template>

<script>
import { Toast, Dialog } from 'vant';

export default {
    data() {
        return {
            active: 2,
        }
    },
    methods: {
        exit() {
            Dialog.confirm({
                title: '个人中心',
                message: '确认要退出吗?',
            }).then(() => {
                this.$store.commit('clearData');
                this.$router.replace('/home');
            }).catch(() => {
                Toast('已取消');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.user_container {
    padding: 0 6px;
    padding-top: 30px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 10px;

        .imgWrap {
            width: 70px;
            height: 70px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .van-button {
        margin-top: 10px;
    }
}
</style>