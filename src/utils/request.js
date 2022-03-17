import axios from 'axios'
import store from '@/store/index.js'

// 1.设置 基地址 (简化 和 复用 基地址)
axios.defaults.baseURL = 'http://toutiao.itheima.net/'
axios.interceptors.request.use(function (conf) {
    if (store.state.user && store.state.user.token) {
        conf.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    return conf
})

// 2.默认导出axios
export default axios