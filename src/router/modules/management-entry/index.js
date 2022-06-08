/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 入账管理模块 路由配置
 */

const entryRoutes = [
    {
        path: '/entry-registration',
        name: 'entry-registration',
        meta: {
            title: '入账登记',
        },
        component: () => import('../../../views/management-entry/entry-registration/EntryRegistration'),
    },
    {
        path: '/entry-talent-contract',
        name: 'entry-talent-contract',
        meta: {
            title: '人才合同价入账',
        },
        component: () => import('../../../views/management-entry/entry-talent-contract/EntryTalentContract'),
    },
    {
        path: '/entry-qualification-transfer',
        name: 'entry-qualification-transfer',
        meta: {
            title: '资质转让入账',
        },
        component: () => import('../../../views/management-entry/entry-qualification-transfer/EntryQualificationTransfer'),
    },
    {
        path: '/entry-qualification-agency',
        name: 'entry-qualification-agency',
        meta: {
            title: '资质代办入账',
        },
        component: () => import('../../../views/management-entry/entry-qualification-agency/EntryQualificationAgency'),
    },
    {
        path: '/entry-title-evaluation',
        name: 'entry-title-evaluation',
        meta: {
            title: '职称评审入账',
        },
        component: () => import('../../../views/management-entry/entry-title-evaluation/EntryTitleEvaluation'),
    },
    {
        path: '/entry-class-three-personnel',
        name: 'entry-class-three-personnel',
        meta: {
            title: '三类人员入账',
        },
        component: () => import('../../../views/management-entry/entry-class-three-personnel/EntryClassThreePersonnel'),
    },
    {
        path: '/entry-education-promotion',
        name: 'entry-education-promotion',
        meta: {
            title: '学历提升入账',
        },
        component: () => import('../../../views/management-entry/entry-education-promotion/EntryEducationPromotion'),
    }
]

export default entryRoutes
