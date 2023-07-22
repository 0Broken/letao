import axios from './index.js';

// 提交订单
export function fetchCommitOrder(orderData) {
    return axios.post('/commitorder', orderData);
}

// 获取订单
export function fetchUserOrder(user_id) {
    return axios.post(`/userorder/${user_id}`);
}
