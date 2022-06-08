/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 业务管理模块 路由配置
 */

const businessRoutes = [
    {
        path: '/talent-query',
        name: 'talent-query',
        meta: {
            title: '人才查询',
        },
        component: () => import('../../../views/management-business/talent-query/TalentQuery'),
    },
    {
        path: '/enterprise-query',
        name: 'enterprise-query',
        meta: {
            title: '企业查询',
        },
        component: () => import('../../../views/management-business/enterprise-query/EnterpriseQuery'),
    },
    {
        path: '/qualification-acquisition',
        name: 'qualification-acquisition',
        meta: {
            title: '资质收购',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisition'),
    },
    {
        path: '/qualification-transfer',
        name: 'qualification-transfer',
        meta: {
            title: '资质转让',
        },
        component: () => import('../../../views/management-business/qualification-transfer/QualificationTransfer'),
    },
    {
        path: '/qualification-agency',
        name: 'qualification-agency',
        meta: {
            title: '资质代办',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgency'),
    },
    {
        path: '/title-evaluation',
        name: 'title-evaluation',
        meta: {
            title: '职称评审',
        },
        component: () => import('../../../views/management-business/title-evaluation/TitleEvaluation'),
    },
    {
        path: '/class-three-personnel',
        name: 'class-three-personnel',
        meta: {
            title: '三类人员',
        },
        component: () => import('../../../views/management-business/class-three-personnel/ClassThreePersonnel'),
    },
    {
        path: '/education-promotion',
        name: 'education-promotion',
        meta: {
            title: '学历提升',
        },
        component: () => import('../../../views/management-business/education-promotion/EducationPromotion'),
    }
]

export default businessRoutes
