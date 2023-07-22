<template>
  <div>
    <van-nav-bar v-show="showTitle" :title=title :left-arrow="showArrow" @click-left="onClickLeft" />

    <!-- 路由匹配的容器 -->
    <router-view></router-view>

    <van-tabbar v-model="active" v-show="showbottomBar">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/shopcar" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/users" icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      active: 0,
      title: '',
      showArrow: '',
      showTitle: '',
      showbottomBar: '',
      isOnLine: ""
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    updateNetworkStatu(e) {
      this.isOnLine = e.type === 'online' ? true : false
    }
  },
  watch: {
    '$route': {
      handler: function (route, fromRoute) {
        let { pageTitle, mainPage, showTitle } = route.meta
        this.title = pageTitle
        this.showArrow = !!mainPage ? false : true;
        this.showbottomBar = !!mainPage ? true : false;
        this.showTitle = showTitle;
        //  !!  两个感叹号  转化为布尔值
        //修补跳转tabbar显示错误bug
        let nameMap = {
          'home': 0,
          'shopcar': 1,
          'users': 2
        }
        this.active = nameMap[route.name];
      },
      immediate: true
    },
    isOnLine() {
      this.isOnLine === false && Toast.loading({
        message: '网络异常，请检查网络'
      });
      this.isOnLine === true && Toast('网络已连接');
    }
  },
  mounted() {
    window.addEventListener('online', this.updateNetworkStatu);
    window.addEventListener('offline', this.updateNetworkStatu);
  },
}
</script>

<style lang="scss">
#nprogress .spinner {
  display: none;
}

#app {
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
}
</style>