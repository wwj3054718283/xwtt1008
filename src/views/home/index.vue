<template>
    <div class="home-container">
        <!-- 1.头部 搜索按钮 -->
        <van-nav-bar class="page-nav-bar">
            <van-button
                slot="title"
                class="search-btn"
                type="info"
                size="small"
                round
                icon="search"
                >搜索</van-button
            >
        </van-nav-bar>

        <!-- 2.中部 tabs频道列表 -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab v-for="chan in channels" :key="chan.id" :title="chan.name">
                <ArticleList :channel="chan" />
            </van-tab>
            <!-- 渐变分隔条 -->
            <div slot="nav-right" class="placeholder"></div>
            <!-- 汉堡按钮 -->
            <div slot="nav-right" class="hamburger-btn">
                <van-icon name="wap-nav" />
            </div>
        </van-tabs>

        <!-- 3.底部 文章列表 -->
    </div>
</template>

<script>
// 导入 请求频道列表 方法
import { getUserChannels } from '@/api/user.js';
// 导入 文章列表 组件
import ArticleList from './components/artilce-list.vue';
export default {
    name: '',
    props: {},
    components: { ArticleList },
    data() {
        return {
            active: 0,
            channels: [],
        };
    },
    async created() {
        const { data: res } = await getUserChannels();
        this.channels = res.data.channels;
    },
    methods: {},
    mounted() {},
    watch: {},
    computed: {},
    filters: {},
};
</script>

<style scoped lang='less'>
.home-container {
    .page-nav-bar {
        background-color: #5babfb;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/.van-nav-bar__title {
            max-width: unset;
        }
        .search-btn {
            width: 100vw;
            height: 58px;
            // background-color: #5babfb;
            border: none;
            font-size: 28px;
            .van-icon {
                font-size: 32px;
                color: #fff;
            }
        }
    }

    // 中间 组件
    /deep/ .channel-tabs {
        .van-tab {
            border-right: 1px solid #e1e4e9;
            min-width: 24vw;
            height: 50px;
            .van-tab__text {
                font-size: 16px;
                color: #666;
            }
        }
        .van-tab--active .van-tab__text {
            color: #333 !important;
        }
        .van-tabs__line {
            width: 18vw !important;
            height: 6px;
            background: rgba(50, 150, 250, 1);
            border-radius: 3px;
            bottom: 2px;
        }
        .van-tabs__nav {
            padding: 0;
        }
        // 分隔条样式
        .placeholder {
            flex-shrink: 0;
            width: 44px;
            height: 50px;
        }
        // 汉堡按钮
        .hamburger-btn {
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 44px;
            height: 50px;
            opacity: 0.902;
            background: rgb(250, 250, 250);
            i.iconfont {
                font-size: 33px;
            }
            &:before {
                content: '';
                position: absolute;
                left: 0;
                width: 1px;
                height: 100%;
                background-image: url('~@/assets/gradient-gray-line.png');
                background-size: contain;
            }
        }
    }
}
</style>