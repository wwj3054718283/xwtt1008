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
                        pattern:/^1[3456789]\d{9}$/,
                        message:'输入手机号格式错误',
                        tirrger:'blur'
                    }
                ],
                code:[
                    {
                        pattern:/^\d{6}$/,
                        message:'输入验证码格式错误',
                        tirrger:'blur'
                    }
                ]
            },
        };
    },
    methods: {
        onSubmit() {},
    },
    mounted() {},
    watch: {},
    computed: {},
    filters: {},
};
</script>

<style scoped lang='less'>
</style>