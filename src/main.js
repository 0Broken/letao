import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vant/vant.js'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import '@/assets/scss/iconfont.css'
const app = createApp(App);
app.use(store)
app.use(router)
app.mount('#app')

