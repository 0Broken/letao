import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    token: "",
    cartDatas: [],
    userInfo: "",
    submitOrder: null
  },
  getters: {
    totalSelectNum(state) {
      let total = 0;
      state.cartDatas.forEach(item => total += item.selectNum)
      return total;
    },
    getIds(state) {
      return state.cartDatas.map(item => item.goodsId).join(',');
    },
    getGoodsNumber(state) {
      let idNumMap = {}
      state.cartDatas.forEach(item => {
        idNumMap[item.goodsId] = item.selectNum;
      })
      return idNumMap
    },
    // 获取选中状态
    getGoodsSelected(state) {
      let idStateMap = {};
      state.cartDatas.forEach(item => {
        idStateMap[item.goodsId] = item.selected;
      })
      return idStateMap
    },
    // 获取选中了多少商品
    getTotalNumber(state) {
      let total = 0;
      state.cartDatas.forEach(item => item.selected && (total += item.selectNum));
      return total
    },
    // 获取总价
    getTotalPrice(state) {
      let price = 0;
      state.cartDatas.forEach(item => item.selected && (price += item.sell_price * item.selectNum));
      return price;
    },
    //获取token数据
    getToken(state) {
      return state.token;
    },
    getCarSelectedTotalNumber(state) {
      let num = 0;
      state.cartDatas.forEach(item => {
        if (item.selected) {
          num += item.selectNum;
        }
      })
      return num;
    },
    getCarSelectedGoodsIds(state) {
      let Ids = [];
      state.cartDatas.forEach(item => {
        if (item.selected) {
          Ids.push(item.goodsId)
        }
      })
      return Ids.join(',');
    }
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeSubmitOrder(state, bool) {
      state.submitOrder = bool
    },
    addCartDatas(state, cartData) {
      let index = state.cartDatas.findIndex(item => item.goodsId === cartData.goodsId);
      console.log(index);
      if (index === -1) {
        state.cartDatas.unshift(cartData);
      } else {
        state.cartDatas[index].selectNum += cartData.selectNum;
      }
    },
    delCartDates(state, id) {
      const number = 0;
      number.forEach(element => {
        return element
      })
      let index = state.cartDatas.findIndex(item => item.goodsId === id);
      state.cartDatas.splice(index, 1);
    },
    changeState(state, { id, checked }) {
      let index = state.cartDatas.findIndex(item => item.goodsId === id);
      state.cartDatas[index].selected = checked;
    },
    changeNumber(state, { value, id }) {
      let index = state.cartDatas.findIndex(item => item.goodsId === id);
      state.cartDatas[index].selectNum = value;
    },
    clearData(state) {
      state.token = "";
      state.cartDatas = [];
    },
    clearSelectedOredr(state) {
      state.cartDatas.forEach((item, index) => {
        if (item.selected) {
          state.cartDatas.splice(index, 1);
        }
      });
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]  //把vuex数据放到本地存储中，解决vuex刷新后数据丢失问题,
})
