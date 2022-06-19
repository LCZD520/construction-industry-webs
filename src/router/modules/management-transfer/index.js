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
        path: '/transfer-talent-view',
        name: 'transfer-talent-view',
        meta: {
            title: '人才转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-talent/TransferTalentView'),
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
        path: '/transfer-enterprise-view',
        name: 'transfer-enterprise-view',
        meta: {
            title: '企业转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-enterprise/TransferEnterpriseView'),
    },
    {
        path: '/transfer-qualification-acquisition',
        name: 'transfer-qualification-acquisition',
        meta: {
            title: '资质收购转账',
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-acquisition/TransferQualificationAcquisition'),
    },
    {
        path: '/transfer-qualification-acquisition-view',
        name: 'transfer-qualification-acquisition-view',
        meta: {
            title: '资质收购转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-acquisition/TransferQualificationAcquisitionView'),
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
        path: '/transfer-of-qualification-view',
        name: 'transfer-of-qualification-view',
        meta: {
            title: '资质转让转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-of-qualification/TransferOfQualificationView'),
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
        path: '/transfer-qualification-agency-view',
        name: 'transfer-qualification-agency-view',
        meta: {
            title: '资质代办转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-agency/TransferQualificationAgencyView'),
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
        path: '/transfer-title-evaluation-view',
        name: 'transfer-title-evaluation-view',
        meta: {
            title: '职称评审转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-title-evaluation/TransferTitleEvaluationView'),
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
        path: '/transfer-class-three-personnel-view',
        name: 'transfer-class-three-personnel-view',
        meta: {
            title: '三类人员转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-class-three-personnel/TransferClassThreePersonnelView'),
    },
    {
        path: '/transfer-education-promotion',
        name: 'transfer-education-promotion',
        meta: {
            title: '学历提升转账',
        },
        component: () => import('../../../views/management-transfer/transfer-education-promotion/TransferEducationPromotion'),
    },
    {
        path: '/transfer-education-promotion-view',
        name: 'transfer-education-promotion-view',
        meta: {
            title: '学历提升转账查看',
        },
        component: () => import('../../../views/management-transfer/transfer-education-promotion/TransferEducationPromotionView'),
    }
]

export default transferRoutes
