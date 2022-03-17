<template>
    <div class="my-container">
        <!-- 已经登录的头部 -->
        <div v-if="user" class="userInfo login_header">
            <!-- 基本信息 -->
            <div class="base">
                <div class="left">
                    <van-image
                        fit="cover"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        class="avatar"
                        round
                    />
                    <span class="name">头条</span>
                </div>
                <div class="right">
                    <van-button type="default" size="mini" round
                        >编辑资料</van-button
                    >
                </div>
            </div>
            <!-- 粉丝、关注 -->
            <div class="data">
                <div class="data-item">
                    <span>{{userInfo.art_count}}</span>
                    <span>头条</span>
                </div>
                <div class="data-item">
                    <span>{{userInfo.follow_count}}</span>
                    <span>关注</span>
                </div>
                <div class="data-item">
                    <span>{{userInfo.fans_count}}</span>
                    <span>粉丝</span>
                </div>
                <div class="data-item">
                    <span>{{userInfo.like_count}}</span>
                    <span>获赞</span>
                </div>
            </div>
        </div>

        <!-- 未登录头部 -->
        <div v-else class="header not-login">
            <!-- 点击 登录注册 按钮，通过 路由管理器 切换到 登录组件 -->
            <div class="login-btn" @click="$router.push('/login')">
                <img class="mobile-img" src="~@/assets/mobile.png" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>

        <!-- 宫格按钮 -->
        <van-grid class="nav-grid" :column-num="2" clickable>
            <van-grid-item text="收藏">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span class="text" slot="text">收藏</span>
            </van-grid-item>
            <van-grid-item text="文字">
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span class="text" slot="text">历史</span>
            </van-grid-item>
        </van-grid>

        <!-- 按钮列表 -->
        <van-cell title="消息通知" is-link url="" />
        <van-cell title="实名认证" is-link url="" />
        <van-cell title="用户反馈" is-link url="" />
        <van-cell title="小智同学" is-link url="" />
        <van-cell title="系统设置" is-link url="" />
        <van-cell
            v-if="user"
            @click="logout"
            class="logout-cell"
            title="退出登录"
            center
        />
    </div>
</template>

<script>
// 导入 vuex 的 state映射方法，用来 将 vuex.state里的属性 映射成 当前组件的 计算属性，
// 以便于组件中访问 --> $store.state.user -> user
import { mapState } from 'vuex';
// 导入 获取用户数据 方法
import { getUsreInfo } from '@/api/user.js';
export default {
    name: 'my',
    props: {},
    data() {
        return {
            userInfo:[]
        };
    },
    async created() {
        // 1.如果仓库中有用户信息 则发送请求
        if(this.user){
            try {
                const {data:res} = await getUsreInfo(this.user.token)
                this.userInfo = res.data
                console.log(res);
            } catch (error) {
                console.log('出错啦：',error);
            }
        }
    },
    methods: {
        // 点击 退出 登录
        logout() {
            this.$dialog
                .confirm({
                    title: '系统提示：）',
                    message: '确认退出？',
                })
                .then(() => {
                    // 删除 vuex仓库 和 LocalStorage 里 token
                    this.$store.commit('setUserToken', null);
                    // 退出提示
                    this.$toast.success('退出成功~！');
                })
                .catch(() => {
                    console.log('点击取消');
                });
        },
    },
    computed: {
        // 将 vuex仓库state中的 user 映射成 一个 计算属性
        ...mapState(['user']),
    },
    watch: {},
    components: {},
};
</script>

<style scoped lang='less'>
.my-container {
    // 未登录头部
    > .header {
        height: 361px;
        background: url('~@/assets/banner.png') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .mobile-img {
            width: 132px;
            height: 132px;
        }
    }

    .login_header {
        height: 401px;
        background: url('~@/assets/banner.png') no-repeat;
        background-size: cover;
    }
    // 未登录头部
    .not-login {
        .login-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .mobile-img {
                width: 132px;
                height: 132px;
                margin-bottom: 15px;
            }
            .text {
                font-size: 28px;
                color: #fff;
            }
        }
    }
    // 已登录头部
    .userInfo {
        .base {
            height: 231px;
            padding: 76px 32px 23px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            .left {
                display: flex;
                align-items: center;
                .avatar {
                    width: 132px;
                    height: 132px;
                    border: 2px solid #fff;
                    /deep/ img {
                        width: 100%;
                    }
                }
                .name {
                    color: #fff;
                    font-size: 29px;
                    margin-left: 22px;
                }
            }
        }
        .data {
            display: flex;
            justify-content: space-around;
            .data-item {
                height: 130px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #fff;
                span:nth-child(1) {
                    font-size: 36px;
                    margin-bottom: 15px;
                }
                span:nth-child(2) {
                    font-size: 23px;
                }
            }
        }
    }

    .nav-grid {
        background: #fff;
        .toutiao {
            font-size: 45px;
        }
        .toutiao-shoucang {
            color: #eb5253;
        }
        .toutiao-lishi {
            color: #ff9d1d;
        }
        .text {
            color: #000;
            margin-top: 8px;
            font-size: 28px;
        }
    }

    .logout-cell {
        height: 100px;
        text-align: center;
        color: #eb5253;
        margin: 10px 0;
        font-size: 30px;
    }
}
</style>