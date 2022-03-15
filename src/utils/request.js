import axios from 'axios'

// 1.设置 基地址 (简化 和 复用 基地址)
axios.defaults.baseURL = 'http://toutiao.itheima.net/'

// 2.默认导出axios
export default axios