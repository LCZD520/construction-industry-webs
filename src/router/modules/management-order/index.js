/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 订单管理模块 路由配置
 */

const orderRoutes = [
    {
        path: '/order-talent',
        name: 'order-talent',
        meta: {
            title: '人才订单',
        },
        component: () => import('../../../views/management-order/order-talent/OrderTalent'),
    },
    {
        path: '/order-qualification-transfer',
        name: 'order-qualification-transfer',
        meta: {
            title: '资质转让订单',
        },
        component: () => import('../../../views/management-order/order-qualification-transfer/OrderQualificationTransfer'),
    },
    {
        path: '/order-title-evaluation',
        name: 'order-title-evaluation',
        meta: {
            title: '职称评审订单',
        },
        component: () => import('../../../views/management-order/order-title-evaluation/OrderTitleEvaluation'),
    },
    {
        path: '/order-class-three-personnel',
        name: 'order-class-three-personnel',
        meta: {
            title: '三类人员订单',
        },
        component: () => import('../../../views/management-order/order-class-three-personnel/OrderClassThreePersonnel'),
    },
    {
        path: '/order-education-promotion',
        name: 'order-education-promotion',
        meta: {
            title: '学历提升订单',
        },
        component: () => import('../../../views/management-order/order-education-promotion/OrderEducationPromotion'),
    }
]

export default orderRoutes
