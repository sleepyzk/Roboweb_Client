import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: {title: '登录'}
    },
    {
        path: '/openScene',
        component: () => import('../views/openScene'),
    },
    {
        path: '/dataScreen',
        component: () => import('../views/DataScreen'),
        meta: {title: '数据可视化'}
    },
    {
        path: '/',
        component: () => import('../components/Main'),
        meta: {title: '主页'},
        children: [
            {
                path: '/home',
                component: () => import('../views/Home.vue'),
                meta: {title: '首页'}
            },
            {
                path: '/model',
                component: () => import('../views/ModelBase'),
                meta: {title: '仿真模型库'}
            },
            {
                path: '/simulation',
                component: () => import('../views/Simulation'),
                meta: {title: '运动仿真'}
            },
            {
                path: '/visual',
                component: () => import('../views/Visual'),
                meta: {title: '工业场景库'}
            },
            {
                path: '/scene',
                component: () => import('../views/CreateScene'),
                meta: {title: '场景编辑器'}
            },
            {
                path: '/digitalTwin',
                component: () => import('../views/DigitalTwin'),
                meta: {title: '数字孪生产线'}
            },
            {
                path: '/analysis',
                component: () => import('../views/Analysis'),
                meta: {title: '数据分析'}
            },
            {
                path: '/admin',
                component: () => import('../views/Admin'),
                meta: {title: '用户管理'}
            },
            {
                path: '/log',
                component: () => import('../views/SystemLog'),
                meta: {title: '系统日志'}
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
