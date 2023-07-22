import axios from './index.js';

// 获取轮播图
export function fetchBanner() {
    return axios.get('/getlunbo');
}

// 获取首页推荐商品
export function fetchRecommend() {
    return axios.get('/recommend');
}

//商品详情接口
export function fetchGoodsInfo(id) {
    return axios.get(`/getgoodsinfo/${id}`);
}

export function fetchShopList(limit = 10) {
    return axios.get(`/recommend?limit=${limit}`);
}

//获取购物车列表接口
export function fetchShopCarList(ids) {
    return axios.get(`/getshopcarlist/${ids}`);
}