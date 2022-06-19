/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 转账管理模块 路由配置
 */

const transferRoutes = [
    {
        path: '/transfer-talent',
        name: 'transfer-talent',
        meta: {
            title: '人才转账',
        },
        component: () => import('../../../views/management-transfer/transfer-talent/TransferTalent'),
    },
    {
        path: '/transfer-enterprise',
        name: 'transfer-enterprise',
        meta: {
            title: '企业转账',
        },
        component: () => import('../../../views/management-transfer/transfer-enterprise/TransferEnterprise'),
    },
    {
        path: '/transfer-qualification-acquisition-view',
        name: 'transfer-qualification-acquisition',
        meta: {
            title: '资质收购转账',
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-acquisition/TransferQualificationAcquisition'),
    },
    {
        path: '/transfer-of-qualification',
        name: 'transfer-of-qualification',
        meta: {
            title: '资质转让转账',
        },
        component: () => import('../../../views/management-transfer/transfer-of-qualification/TransferOfQualification'),
    },
    {
        path: '/transfer-qualification-agency',
        name: 'transfer-qualification-agency',
        meta: {
            title: '资质代办转账',
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-agency/TransferQualificationAgency'),
    },
    {
        path: '/transfer-title-evaluation',
        name: 'transfer-title-evaluation',
        meta: {
            title: '职称评审转账',
        },
        component: () => import('../../../views/management-transfer/transfer-title-evaluation/TransferTitleEvaluation'),
    },
    {
        path: '/transfer-class-three-personnel',
        name: 'transfer-class-three-personnel',
        meta: {
            title: '三类人员转账',
        },
        component: () => import('../../../views/management-transfer/transfer-class-three-personnel/TransferClassThreePersonnel'),
    },
    {
        path: '/transfer-education-promotion',
        name: 'transfer-education-promotion',
        meta: {
            title: '学历提升转账',
        },
        component: () => import('../../../views/management-transfer/transfer-education-promotion/TransferEducationPromotion'),
    }
]

export default transferRoutes
