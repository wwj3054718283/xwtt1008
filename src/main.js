import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.less';
import 'amfe-flexible'
import axios from './utils/request.js'

// 将 axios 挂载到 Vue原型中
Vue.prototype.$http = axios
Vue.use(Vant)

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
