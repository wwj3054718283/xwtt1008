import axios from '@/utils/request.js'

export const login = function(mobile,code){
    return axios({
        method:'post',
        url:'/v1_0/authorizations',
        data:{
            mobile,
            code
        }
    })
}
