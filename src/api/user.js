import axios from './index.js';

// 登录接口
export function fetchLogin(dataform) {
    return axios.post('/login', dataform);
}

// 注册接口
export function fetchRegister(datafrom) {
    return axios.post('/register', datafrom);
}