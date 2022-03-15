import Vant from 'vant';
import 'vant/lib/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.less';

import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
