import Vue from 'vue';
import Vuex from 'vuex';
import {setItem} from '@/utils/storage.js'

Vue.use(Vuex);

export default new Vuex.Store({
    // 仓库存储器
    state: {
        user: {
            //   a.保存token
            token: null,
            refresh_token: null
        }
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
