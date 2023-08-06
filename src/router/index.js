/**
 * Created by Lv Cheng on 2022/2/22
 * Notes
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import basicDataRoutes from "./modules/basic-data";
import achievementRoutes from "./modules/management-achievement";
import businessRoutes from "./modules/management-business";
import entryRoutes from "./modules/management-entry";
import logisticsRoutes from "./modules/management-logistics";
import orderRoutes from "./modules/management-order";
import resourcesRoutes from "./modules/management-resources";
import stockRoutes from "./modules/management-stock";
import systemRoutes from "./modules/management-system";
import transferRoutes from "./modules/management-transfer";
import statisticsRoutes from "./modules/statistical-analysis";
import recycleBinRoutes from "./modules/recycle-bin";

Vue.use(Router)

const routes = [
    ...basicDataRoutes,
    ...achievementRoutes,
    ...businessRoutes,
    ...entryRoutes,
    ...logisticsRoutes,
    ...orderRoutes,
    ...resourcesRoutes,
    ...stockRoutes,
    ...systemRoutes,
    ...transferRoutes,
    ...statisticsRoutes,
    ...recycleBinRoutes,
    // 首页
    {
        path: '/home',
        name: 'home',
        // component: () => import('../views/home/Home')
        component: () => import('../views/home/GoodsSku')
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Login')
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('../views/home/Home')
    },
    {
        path: '*',
        name: 'error404',
        meta: {},
        component: () => import('../views/error404/Error404')
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

import NProgress from 'nprogress'

// 全局路由拦截
router.beforeEach((to, from, next) => {
    // console.log(document.referrer, 'referrer')
    const token = localStorage.getItem('access_token')
    if (to.path === "/login") {
        next();
        NProgress.start()
    } else {
        if (store.state.loginStatus && token && token !== '') {
            next();
            NProgress.start()
        } else {
            router.push("/login");
        }
    }

});

router.afterEach(() => {
    setTimeout(() => {
        NProgress.done()
    }, 0)

});
export default router
