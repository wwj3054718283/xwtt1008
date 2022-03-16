<template>
    <div class="login-container">
        <!-- 标题导航栏 -->
        <van-nav-bar title="登录" left-arrow />

        <!-- 登录表单 -->
        <van-form @submit="onSubmit">
            <!-- 手机号文本框 -->
            <van-field
                v-model="user.mobile"
                :rules="userRules.mobile"
                name="手机号"
                placeholder="请输入手机号"
            >
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>

            <!-- 验证码输入框 -->
            <van-field
                v-model="user.code"
                :rules="userRules.code"
                type="number"
                name="验证码"
                placeholder="请输入验证码"
            >
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <van-button
                        class="send-sms-btn"
                        round
                        size="small"
                        type="default"
                        >发送验证码</van-button
                    >
                </template>
            </van-field>

            <!-- 提交按钮 -->
            <div style="margin: 16px">
                <van-button block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login } from '@/api/user.js';
export default {
    name: '',
    props: {},
    components: {},
    data() {
        return {
            user: {
                // 手机号
                mobile: '',
                // 验证码
                code: 246810,
            },
            userRules: {
                mobile: [
                    {
                        required: true,
                        tirrger: 'blur',
                    },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: '输入手机号格式错误',
                        tirrger: 'blur',
                    },
                ],
                code: [
                    {
                        pattern: /^\d{6}$/,
                        message: '输入验证码格式错误',
                        tirrger: 'blur',
                    },
                ],
            },
        };
    },
    methods: {
        async onSubmit() {
            // 1.轻提示 登录进行中
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                message: '加载中...',
                forbidClick: true, // 是否禁止背景点击
            });
            try {
                // 2.发起登录 请求
                let {data:res} = await login(this.user.mobile, this.user.code);
                console.log(res);
                // 3.轻提示 登录成功
                this.$toast.success('登录成功咯~');
                // 4.将 token保存到本地 和 vuex仓库
                this.$store.commit('setUserToken', res.data)
                // 5.路由前进 跳转到#/my组件
                // this.$router.push('/my')
            } catch (error) {
                console.log(error);
                // 6.轻提示 登录失败
                this.$toast.fail('登录失败咯~');
            }
        },
    },
    mounted() {},
    watch: {},
    computed: {},
    filters: {},
};
</script>

<style scoped lang='less'>
</style>