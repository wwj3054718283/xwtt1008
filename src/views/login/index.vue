<template>
    <div class="login-container">
        <!-- 标题导航栏 -->
        <van-nav-bar title="登录" left-arrow />

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <!-- 手机号文本框 -->
            <van-field
                v-model="user.mobile"
                :rules="userRules.mobile"
                name="手机号"
                placeholder="请输入手机号"
            >
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>

            <van-field
                v-model="user.code"
                :rules="userRules.code"
                type="number"
                name="验证码"
                placeholder="请输入验证码"
            >
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <!-- 右侧 发送短信 按钮 -->
                <template #button>
                    <!-- 倒计时器 -->
                    <van-count-down
                        v-if="isShowCount"
                        :time="time"
                        format="ss 秒"
                        @finish="isShowCount = false"
                    />

                    <!-- 发送验证码按钮 -->
                    <van-button
                        v-else
                        class="send-sms-btn"
                        round
                        native-type="button"
                        size="small"
                        type="default"
                        @click="sendSms"
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
import { login, sendSMS } from '@/api/user.js';
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
            time: 60 * 1000,
            isShowCount: false,
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
                let { data: res } = await login(
                    this.user.mobile,
                    this.user.code
                );
                console.log(res);
                // 3.轻提示 登录成功
                this.$toast.success('登录成功咯~');
                // 4.将 token保存到本地 和 vuex仓库
                this.$store.commit('setUserToken', res.data);
                // 5.路由前进 跳转到#/my组件
                this.$router.push('/my')
            } catch (error) {
                console.log(error);
                // 6.轻提示 登录失败
                this.$toast.fail('登录失败咯~');
            }
        },

        // 发送短信验证码-------------------
        async sendSms() {
            // 1.使用 try catch 代替 成功 和 失败回调函数
            try {
                // 执行校验，并返回一个 Promise对象
                await this.$refs.loginForm.validate('mobile');
            } catch (error) {
                // 校验失败，直接Return，后面代码就不执行了！
                return console.log('校验失败了哦~！');
            }

            this.isShowCount = true;
            // 2.调用 短信验证码 接口
            try {
                await sendSMS(this.user.mobile);
                this.$toast.success('发送短信验证码成功~');
            } catch (error) {
                this.$toast.fail('发送短信验证码失败~~！');
                console.log('发送短信验证码失败~~！', error.message);
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