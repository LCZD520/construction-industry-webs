/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 入账管理模块 路由配置
 */

const entryRoutes = [
    {
        path: '/entry-registration',
        name: 'entry-registration',
        meta: {
            title: '入账登记列表',
            activeMenuPath: '/entry-registration',
        },
        component: () => import('../../../views/management-entry/entry-registration/EntryRegistration'),
    },
    {
        path: '/entry-registration-view',
        name: 'entry-registration-view',
        meta: {
            title: '入账登记查看',
            activeMenuPath: '/entry-registration',
        },
        component: () => import('../../../views/management-entry/entry-registration/EntryRegistrationView'),
    },
    {
        path: '/entry-registration-add',
        name: 'entry-registration-add',
        meta: {
            title: '入账登记添加',
            activeMenuPath: '/entry-registration',
        },
        component: () => import('../../../views/management-entry/entry-registration/EntryRegistrationAdd'),
    },
    {
        path: '/entry-talent-contract',
        name: 'entry-talent-contract',
        meta: {
            title: '人才合同价入账列表',
            activeMenuPath: '/entry-talent-contract',
        },
        component: () => import('../../../views/management-entry/entry-talent-contract/EntryTalentContract'),
    },
    {
        path: '/entry-talent-contract-view',
        name: 'entry-talent-contract-view',
        meta: {
            title: '人才合同价入账查看',
            activeMenuPath: '/entry-talent-contract',
        },
        component: () => import('../../../views/management-entry/entry-talent-contract/EntryTalentContractView'),
    },
    {
        path: '/entry-qualification-transfer',
        name: 'entry-qualification-transfer',
        meta: {
            title: '资质转让入账列表',
            activeMenuPath: '/entry-qualification-transfer',
        },
        component: () => import('../../../views/management-entry/entry-qualification-transfer/EntryQualificationTransfer'),
    },
    {
        path: '/entry-qualification-transfer-view',
        name: 'entry-qualification-transfer-view',
        meta: {
            title: '资质转让入账查看',
            activeMenuPath: '/entry-qualification-transfer',
        },
        component: () => import('../../../views/management-entry/entry-qualification-transfer/EntryQualificationTransferView'),
    },
    {
        path: '/entry-qualification-agency',
        name: 'entry-qualification-agency',
        meta: {
            title: '资质代办入账列表',
            activeMenuPath: '/entry-qualification-agency',
        },
        component: () => import('../../../views/management-entry/entry-qualification-agency/EntryQualificationAgency'),
    },
    {
        path: '/entry-qualification-agency-view',
        name: 'entry-qualification-agency-view',
        meta: {
            title: '资质代办入账查看',
            activeMenuPath: '/entry-qualification-agency',
        },
        component: () => import('../../../views/management-entry/entry-qualification-agency/EntryQualificationAgencyView'),
    },
    {
        path: '/entry-title-evaluation',
        name: 'entry-title-evaluation',
        meta: {
            title: '职称评审入账列表',
            activeMenuPath: '/entry-title-evaluation',
        },
        component: () => import('../../../views/management-entry/entry-title-evaluation/EntryTitleEvaluation'),
    },
    {
        path: '/entry-title-evaluation-view',
        name: 'entry-title-evaluation-view',
        meta: {
            title: '职称评审入账查看',
            activeMenuPath: '/entry-title-evaluation',
        },
        component: () => import('../../../views/management-entry/entry-title-evaluation/EntryTitleEvaluationView'),
    },
    {
        path: '/entry-class-three-personnel',
        name: 'entry-class-three-personnel',
        meta: {
            title: '三类人员入账列表',
            activeMenuPath: '/entry-class-three-personnel',
        },
        component: () => import('../../../views/management-entry/entry-class-three-personnel/EntryClassThreePersonnel'),
    },
    {
        path: '/entry-class-three-personnel-view',
        name: 'entry-class-three-personnel-view',
        meta: {
            title: '三类人员入账查看',
            activeMenuPath: '/entry-class-three-personnel',
        },
        component: () => import('../../../views/management-entry/entry-class-three-personnel/EntryClassThreePersonnelView'),
    },
    {
        path: '/entry-education-promotion',
        name: 'entry-education-promotion',
        meta: {
            title: '学历提升入账列表',
            activeMenuPath: '/entry-education-promotion',
        },
        component: () => import('../../../views/management-entry/entry-education-promotion/EntryEducationPromotion'),
    },
    {
        path: '/entry-education-promotion-view',
        name: 'entry-education-promotion-view',
        meta: {
            title: '学历提升入账查看',
            activeMenuPath: '/entry-education-promotion',
        },
        component: () => import('../../../views/management-entry/entry-education-promotion/EntryEducationPromotionView'),
    },
]

export default entryRoutes
