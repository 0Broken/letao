const axios = require('axios');
import store from '@/store/index.js';
import { Toast } from 'vant';
import router from '@/router/index.js';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:3300/api',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if (store.state.token) {
        config.headers['token'] = store.state.token;
    }
    config.headers['Cache-Control'] = 'no-store';  //告诉浏览器不要缓存   
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.data.status === 40001) {  //这里的40001是后端处理好的，后端会自动验证token，如果验证失败，会返回40001
        store.commit('changeToken', '');  //token失效后从新清除token然后跳转到登录页面，跳转到登录页时记录下上一个的跳转页面
        Toast(response.data.message + '请重新登录');
        router.push({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath, //拿到当前的路由路径 ，重新登录成功后会回到上一个访问的页面 
            }
        });
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance