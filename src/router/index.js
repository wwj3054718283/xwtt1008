import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/layout',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '', // 默认子路由
                component: () => import('@/views/home/index.vue'),
            },
            {
                path: '/my',
                component: () => import('@/views/my/index.vue'),
            },
            {
                path: 'qa',
                component: () => import('@/views/qa/index.vue')
            },
            {
                path: '/video',
                component: () => import('@/views/video/index.vue')
            },
        ]
    },

];

const router = new VueRouter({
    routes,
});

export default router;
