/**
 * Created by Lv Cheng on 2022/2/22
 * Notes
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

const routes = [
    // 首页
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home')
    },
    // 商品管理
    // {
    //     path: '/goods-management',
    //     meta: {
    //         title: '商品管理',
    //     },
    //     component: () => import('../views/goods-management/GoodsManagement'),
    //     children: [
    //         {
    //             path: 'goods-list',
    //             name: 'goods-list',
    //             meta: {
    //                 title: '商品列表',
    //             },
    //             component: () => import('../views/goods-management/goods-list/GoodsList')
    //         },
    //         {
    //             path: 'goods-category',
    //             name: 'goods-category',
    //             meta: {
    //                 title: '商品分类',
    //             },
    //             component: () => import('../views/goods-management/goods-category/GoodsCategory')
    //         },
    //         {
    //             path: 'goods-carousel',
    //             name: 'goods-carousel',
    //             meta: {
    //                 title: '首页轮播图',
    //             },
    //             component: () => import('../views/goods-management/goods-carousel/GoodsCarousel')
    //         },
    //         {
    //             path: 'goods-evaluate',
    //             name: 'goods-evaluate',
    //             meta: {
    //                 title: '商品评价',
    //             },
    //             component: () => import('../views/goods-management/goods-evaluate/GoodsEvaluate')
    //         },
    //         {
    //             path: 'goods-brand',
    //             name: 'goods-brand',
    //             meta: {
    //                 title: '商品品牌',
    //             },
    //             component: () => import('../views/goods-management/goods-brand/GoodsBrand')
    //         },
    //         {
    //             path: 'goods-stock',
    //             name: 'goods-stock',
    //             meta: {
    //                 title: '商品库存',
    //             },
    //             component: () => import('../views/goods-management/goods-stock/GoodsStock')
    //         },
    //         {
    //             path: 'goods-examine',
    //             name: 'goods-examine',
    //             meta: {
    //                 title: '商品审核',
    //             },
    //             component: () => import('../views/goods-management/goods-examine/GoodsExamine')
    //         },
    //     ]
    // },
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

// 全局路由拦截
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    // console.log(store.state.loginStatus);
    if (to.path === '/login') {
        next()
    } else {
        if (store.state.loginStatus) {
            next()
        } else {
            router.push("/login")
        }
    }
})

export default router
