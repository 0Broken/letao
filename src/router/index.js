import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import ShopCar from '@/views/ShopCar.vue';
import Users from '@/views/Users.vue';
import UserAddress from '@/views/UserAddress';
import AddAddress from '@/views/AddAddress';
import GoodsInfo from '@/views/GoodsInfo';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Goodslist from '@/views/Goodslist';
import Search from '@/views/Search';
import AllGoods from '@/views/AllGoods';
import store from '@/store/index.js'
import NProgress from '../../node_modules/nprogress/nprogress.js'
import '../../node_modules/nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      pageTitle: '首页',
      mainPage: true,
      showTitle: false
    },
    children: [{
      path: 'search',
      name: 'search',
      component: Search,
      meta: {
        pageTitle: '搜索页面',
        mainPage: false,
        showTitle: false,
      },
    }]
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: ShopCar,
    meta: {
      pageTitle: '购物车',
      showTitle: true,
      mainPage: true,
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      pageTitle: '个人中心',
      mainPage: true,
      showTitle: true,
      requireAuth: true
    }
  },
  {
    path: '/useraddress',
    name: 'useraddress',
    component: UserAddress,
    meta: {
      pageTitle: '个人地址',
      showTitle: true,
    }
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: AddAddress,
    meta: {
      pageTitle: '添加地址',
      showTitle: true,
    }
  },
  {
    path: '/goodsinfo/:id',
    name: 'goodsinfo',
    component: GoodsInfo,
    meta: {
      pageTitle: '商品详情',
      showTitle: true
    }
  },
  {
    path: '/allgoods',
    name: 'allgoods',
    component: AllGoods,
    meta: {
      pageTitle: '全部商品',
      showTitle: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      pageTitle: '登录页面',
      showTitle: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      pageTitle: '登录页面',
      showTitle: true
    }
  },
  {
    path: '/goodslist',
    name: 'goodslist',
    component: Goodslist,
    meta: {
      pageTitle: '数码电器',
      showTitle: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  let { requireAuth } = to.meta;
  let { path } = to
  console.log('path', path);
  let token = store.state.token;
  // 判断有无token，有token就在判断是不是在login页面，在login页面就直接跳回首页
  if (token) {
    if (path === '/login') {
      next({ path: '/home' });
    } else {
      next();
    }
  } else {
    // 无token，判断是否需要页面权限，为true则打回登录页面，为false则不需要权限继续操作
    if (requireAuth) {
      // 抑制掉重定向问题 catch(() => { })  如果在当前页面重定向到当前页面，就会出错，所以要使用catch来捕获
      router.push('/login').catch(() => { });
    } else {
      next();
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router
