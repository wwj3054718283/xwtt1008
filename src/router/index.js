import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        component: ()=>import('@/views/login/index.vue'),
    },
    {
      path: '/',
      component: ()=>import('@/views/layout/index.vue'),
      children:[
        {
            path: '', // 默认子路由
            component: ()=>import('@/views/home/index.vue'),
        },
        {
            path: '/my',
            component: ()=>import('@/views/my/index.vue'),
        },
      ]
    },

];

const router = new VueRouter({
  routes,
});

export default router;
