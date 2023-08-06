/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 转账管理模块 路由配置
 */

const transferRoutes = [
    {
        path: '/transfer-talent',
        name: 'transfer-talent',
        meta: {
            title: '人才转账审核列表',
            activeMenuPath: '/transfer-talent'
        },
        component: () => import('../../../views/management-transfer/transfer-talent/TransferTalent'),
    },
    {
        path: '/transfer-talent-audit/:id',
        name: 'transfer-talent-audit',
        meta: {
            title: '人才转账审核',
            activeMenuPath: '/transfer-talent'
        },
        component: () => import('../../../views/management-transfer/transfer-talent/TransferTalentAudit'),
    },
    {
        path: '/transfer-talent-view/:id',
        name: 'transfer-talent-view',
        meta: {
            title: '人才转账审核查看',
            activeMenuPath: '/transfer-talent'
        },
        component: () => import('../../../views/management-transfer/transfer-talent/TransferTalentView'),
    },
    {
        path: '/transfer-enterprise',
        name: 'transfer-enterprise',
        meta: {
            title: '市场开拓转账列表',
            activeMenuPath: '/transfer-enterprise'
        },
        component: () => import('../../../views/management-transfer/transfer-enterprise/TransferEnterprise'),
    },
    {
        path: '/transfer-enterprise-audit/:id',
        name: 'transfer-enterprise-audit',
        meta: {
            title: '市场开拓转账审核',
            activeMenuPath: '/transfer-enterprise'
        },
        component: () => import('../../../views/management-transfer/transfer-enterprise/TransferEnterpriseAudit'),
    },
    {
        path: '/transfer-enterprise-view/:id',
        name: 'transfer-enterprise-view',
        meta: {
            title: '市场开拓转账查看',
            activeMenuPath: '/transfer-enterprise'
        },
        component: () => import('../../../views/management-transfer/transfer-enterprise/TransferEnterpriseView'),
    },
    {
        path: '/transfer-qualification-acquisition',
        name: 'transfer-qualification-acquisition',
        meta: {
            title: '资质收购转账列表',
            activeMenuPath: '/transfer-qualification-acquisition'
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-acquisition/TransferQualificationAcquisition'),
    },
    {
        path: '/transfer-qualification-acquisition-view/:id',
        name: 'transfer-qualification-acquisition-view',
        meta: {
            title: '资质收购转账查看',
            activeMenuPath: '/transfer-qualification-acquisition'
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-acquisition/TransferQualificationAcquisitionView'),
    },
    {
        path: '/transfer-of-qualification',
        name: 'transfer-of-qualification',
        meta: {
            title: '资质转让转账',
            activeMenuPath: '/transfer-of-qualification'
        },
        component: () => import('../../../views/management-transfer/transfer-of-qualification/TransferOfQualification'),
    },
    {
        path: '/transfer-of-qualification-view/:id',
        name: 'transfer-of-qualification-view',
        meta: {
            title: '资质转让转账查看',
            activeMenuPath: '/transfer-of-qualification'
        },
        component: () => import('../../../views/management-transfer/transfer-of-qualification/TransferOfQualificationView'),
    },
    {
        path: '/transfer-qualification-agency',
        name: 'transfer-qualification-agency',
        meta: {
            title: '资质代办转账列表',
            activeMenuPath: '/transfer-qualification-agency'
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-agency/TransferQualificationAgency'),
    },
    {
        path: '/transfer-qualification-agency-view/:id',
        name: 'transfer-qualification-agency-view',
        meta: {
            title: '资质代办转账查看',
            activeMenuPath: '/transfer-qualification-agency'
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-agency/TransferQualificationAgencyView'),
    },
    {
        path: '/transfer-qualification-agency-audit/:id',
        name: 'transfer-qualification-agency-audit',
        meta: {
            title: '资质代办转账审批',
            activeMenuPath: '/transfer-qualification-agency'
        },
        component: () => import('../../../views/management-transfer/transfer-qualification-agency/TransferQualificationAgencyAudit'),
    },
    {
        path: '/transfer-title-evaluation',
        name: 'transfer-title-evaluation',
        meta: {
            title: '职称评审转账列表',
            activeMenuPath: '/transfer-title-evaluation'
        },
        component: () => import('../../../views/management-transfer/transfer-title-evaluation/TransferTitleEvaluation'),
    },
    {
        path: '/transfer-class-three-personnel-view/:id',
        name: 'transfer-title-evaluation-view',
        meta: {
            title: '职称评审转账查看',
            activeMenuPath: '/transfer-title-evaluation'
        },
        component: () => import('../../../views/management-transfer/transfer-title-evaluation/TransferTitleEvaluationView'),
    },
    {
        path: '/transfer-title-evaluation-audit/:id',
        name: 'transfer-title-evaluation-audit',
        meta: {
            title: '职称评审转账审核',
            activeMenuPath: '/transfer-title-evaluation'
        },
        component: () => import('../../../views/management-transfer/transfer-title-evaluation/TransferTitleEvaluationAudit'),
    },
    {
        path: '/transfer-class-three-personnel',
        name: 'transfer-class-three-personnel',
        meta: {
            title: '三类人员转账列表',
            activeMenuPath: '/transfer-class-three-personnel'
        },
        component: () => import('../../../views/management-transfer/transfer-class-three-personnel/TransferClassThreePersonnel'),
    },
    {
        path: '/transfer-class-three-personnel-view/:id',
        name: 'transfer-class-three-personnel-view',
        meta: {
            title: '三类人员转账查看',
            activeMenuPath: '/transfer-class-three-personnel'
        },
        component: () => import('../../../views/management-transfer/transfer-class-three-personnel/TransferClassThreePersonnelView'),
    },
    {
        path: '/transfer-education-promotion',
        name: 'transfer-education-promotion',
        meta: {
            title: '学历提升转账列表',
            activeMenuPath: '/transfer-education-promotion'
        },
        component: () => import('../../../views/management-transfer/transfer-education-promotion/TransferEducationPromotion'),
    },
    {
        path: '/transfer-education-promotion-view/:id',
        name: 'transfer-education-promotion-view',
        meta: {
            title: '学历提升转账查看',
            activeMenuPath: '/transfer-education-promotion'
        },
        component: () => import('../../../views/management-transfer/transfer-education-promotion/TransferEducationPromotionView'),
    }
]

export default transferRoutes
