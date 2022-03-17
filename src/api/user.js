import axios from '@/utils/request.js'

// 1.登录 请求
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
// 2. 发送 短信 验证码
export const sendSMS = (mobile)=>{
    return axios({
        method:'get',
        url:'/v1_0/sms/codes/:mobile',
        prams:{
            mobile
        }
    })
}

// 3. 获取 用户数据
export const getUsreInfo = (usrToken)=>{
    return axios({
        method:'get',
        url:'/v1_0/user',
       headers:{'Authorization':'Bearer '+usrToken}
    })
}