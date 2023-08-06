/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 订单管理模块 路由配置
 */

const orderRoutes = [
    {
        path: '/order-talent',
        name: 'order-talent',
        meta: {
            title: '人才订单列表',
            activeMenuPath: '/order-talent'
        },
        component: () => import('../../../views/management-order/order-talent/OrderTalent'),
    },
    {
        path: '/order-talent-view/:id',
        name: 'order-talent-view',
        meta: {
            title: '人才订单查看',
            activeMenuPath: '/order-talent'
        },
        component: () => import('../../../views/management-order/order-talent/OrderTalentView'),
    },
    {
        path: '/order-qualification-transfer',
        name: 'order-qualification-transfer',
        meta: {
            title: '资质转让订单列表',
            activeMenuPath: '/order-qualification-transfer'
        },
        component: () => import('../../../views/management-order/order-qualification-transfer/OrderQualificationTransfer'),
    },
    {
        path: '/order-qualification-transfer-view/:id',
        name: 'order-qualification-transfer-view',
        meta: {
            title: '资质转让订单查看',
            activeMenuPath: '/order-qualification-transfer'
        },
        component: () => import('../../../views/management-order/order-qualification-transfer/OrderQualificationTransferView'),
    },
    {
        path: '/order-title-evaluation',
        name: 'order-title-evaluation',
        meta: {
            title: '职称评审订单列表',
            activeMenuPath: '/order-title-evaluation'
        },
        component: () => import('../../../views/management-order/order-title-evaluation/OrderTitleEvaluation'),
    },
    {
        path: '/order-title-evaluation-view/:id',
        name: 'order-title-evaluation-view',
        meta: {
            title: '职称评审订单查看',
            activeMenuPath: '/order-title-evaluation'
        },
        component: () => import('../../../views/management-order/order-title-evaluation/OrderTitleEvaluationView'),
    },
    {
        path: '/order-title-evaluation-edit/:id',
        name: 'order-title-evaluation-edit',
        meta: {
            title: '职称评审订单编辑',
            activeMenuPath: '/order-title-evaluation'
        },
        component: () => import('../../../views/management-order/order-title-evaluation/OrderTitleEvaluationEdit'),
    },
    {
        path: '/order-class-three-personnel',
        name: 'order-class-three-personnel',
        meta: {
            title: '三类人员订单列表',
            activeMenuPath: '/order-class-three-personnel'
        },
        component: () => import('../../../views/management-order/order-class-three-personnel/OrderClassThreePersonnel'),
    },
    {
        path: '/order-class-three-personnel-view/:id',
        name: 'order-class-three-personnel-view',
        meta: {
            title: '三类人员订单查看',
            activeMenuPath: '/order-class-three-personnel'
        },
        component: () => import('../../../views/management-order/order-class-three-personnel/OrderClassThreePersonnelView'),
    },
    {
        path: '/order-class-three-personnel-edit/:id',
        name: 'order-class-three-personnel-edit',
        meta: {
            title: '三类人员订单编辑',
            activeMenuPath: '/order-class-three-personnel'
        },
        component: () => import('../../../views/management-order/order-class-three-personnel/OrderClassThreePersonnelEdit'),
    },
    {
        path: '/order-education-promotion',
        name: 'order-education-promotion',
        meta: {
            title: '学历提升订单列表',
            activeMenuPath: '/order-education-promotion'
        },
        component: () => import('../../../views/management-order/order-education-promotion/OrderEducationPromotion'),
    },
    {
        path: '/order-education-promotion-view/:id',
        name: 'order-education-promotion-view',
        meta: {
            title: '学历提升订单查看',
            activeMenuPath: '/order-education-promotion'
        },
        component: () => import('../../../views/management-order/order-education-promotion/OrderEducationPromotionView'),
    },
    {
        path: '/order-education-promotion-edit/:id',
        name: 'order-education-promotion-edit',
        meta: {
            title: '学历提升订单编辑',
            activeMenuPath: '/order-education-promotion'
        },
        component: () => import('../../../views/management-order/order-education-promotion/OrderEducationPromotionEdit'),
    }
]

export default orderRoutes
