import axios from './index.js';

// 添加地址接口
export function fetchAddAddress(id, addressList) {
    return axios.post(`/addaddress/${id}`, addressList);
}

// 获取地址接口
export function fetchGetAddress(id) {
    return axios.get(`/getaddress/${id}`);
}

// 删除地址接口
export function fetchDelAddress(id) {
    return axios.post(`/deladdress/${id}`);
}

// 修改地址接口
export function fetchUpdateAddress(id, addressInfo) {
    return axios.post(`/updateaddress/${id}`, addressInfo);
}