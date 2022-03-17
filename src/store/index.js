import { setItem } from '@/utils/storage.js';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // 仓库存储器
    state: {
        user: null
    },
    mutations: {
        // 1.将 更新后 token 保存到 仓库user中
        setUserToken(state, userTokens) {
            // 1.1 保存到仓库
            state.user = userTokens
            // 1.2 保存到LocalStorage
            setItem('usertoken',userTokens)
        }
    },
    actions: {},
    modules: {},
});
