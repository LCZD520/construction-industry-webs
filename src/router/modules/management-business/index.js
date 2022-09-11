/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 业务管理模块 路由配置
 */

const businessRoutes = [
    {
        path: '/talent-query',
        name: 'talent-query',
        meta: {
            title: '人才查询列表',
            activeMenuPath: '/talent-query',
        },
        component: () => import('../../../views/management-business/talent-query/TalentQuery'),
    },
    {
        path: '/talent-query-view',
        name: 'talent-query-view',
        meta: {
            title: '人才查询查看',
            activeMenuPath: '/talent-query',
        },
        component: () => import('../../../views/management-business/talent-query/TalentQueryView'),
    },
    {
        path: '/talent-query-add',
        name: 'talent-query-add',
        meta: {
            title: '人才查询添加',
            activeMenuPath: '/talent-query',
        },
        component: () => import('../../../views/management-business/talent-query/TalentQueryAdd'),
    },
    {
        path: '/talent-query-edit/:id',
        name: 'talent-query-edit',
        meta: {
            title: '人才查询编辑',
            activeMenuPath: '/talent-query',
        },
        component: () => import('../../../views/management-business/talent-query/TalentQueryEdit'),
    },
    {
        path: '/enterprise-query',
        name: 'enterprise-query',
        meta: {
            title: '企业查询列表',
            activeMenuPath: '/enterprise-query',
        },
        component: () => import('../../../views/management-business/enterprise-query/EnterpriseQuery'),
    },
    {
        path: '/enterprise-query-add',
        name: 'enterprise-query-add',
        meta: {
            title: '企业查询添加',
            activeMenuPath: '/enterprise-query',
        },
        component: () => import('../../../views/management-business/enterprise-query/EnterpriseAdd'),
    },
    {
        path: '/enterprise-query-edit/:id',
        name: 'enterprise-query-edit',
        meta: {
            title: '企业查询编辑',
            activeMenuPath: '/enterprise-query',
        },
        component: () => import('../../../views/management-business/enterprise-query/EnterpriseEdit'),
    },
    {
        path: '/enterprise-query-view',
        name: 'enterprise-query-view',
        meta: {
            title: '企业查询查看',
            activeMenuPath: '/enterprise-query',
        },
        component: () => import('../../../views/management-business/enterprise-query/EnterpriseQueryView'),
    },
    {
        path: '/qualification-acquisition',
        name: 'qualification-acquisition',
        meta: {
            title: '资质收购',
            activeMenuPath: '/qualification-acquisition',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisition'),
    },
    {
        path: '/qualification-acquisition-view',
        name: 'qualification-acquisition-view',
        meta: {
            title: '资质收购查看',
            activeMenuPath: '/qualification-acquisition',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisitionView'),
    },
    {
        path: '/qualification-acquisition-add',
        name: 'qualification-acquisition-add',
        meta: {
            title: '资质收购添加',
            activeMenuPath: '/qualification-acquisition',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisitionAdd'),
    },
    {
        path: '/qualification-acquisition-edit',
        name: 'qualification-acquisition-edit',
        meta: {
            title: '资质收购编辑',
            activeMenuPath: '/qualification-acquisition',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisitionEdit'),
    },
    {
        path: '/qualification-acquisition-stripping',
        name: 'qualification-acquisition-stripping',
        meta: {
            title: '资质收购剥离',
            activeMenuPath: '/qualification-acquisition',
        },
        component: () => import('../../../views/management-business/qualification-acquisition/QualificationAcquisitionStripping'),
    },
    {
        path: '/qualification-transfer',
        name: 'qualification-transfer',
        meta: {
            title: '资质转让列表',
            activeMenuPath: '/qualification-transfer',
        },
        component: () => import('../../../views/management-business/qualification-transfer/QualificationTransfer'),
    },
    {
        path: '/qualification-transfer-view',
        name: 'qualification-transfer-view',
        meta: {
            title: '资质转让查看',
            activeMenuPath: '/qualification-transfer',
        },
        component: () => import('../../../views/management-business/qualification-transfer/QualificationTransferView'),
    },
    {
        path: '/qualification-transfer-add',
        name: 'qualification-transfer-add',
        meta: {
            title: '资质转让添加',
            activeMenuPath: '/qualification-transfer',
        },
        component: () => import('../../../views/management-business/qualification-transfer/QualificationTransferAdd'),
    },
    {
        path: '/qualification-agency',
        name: 'qualification-agency',
        meta: {
            title: '资质代办列表',
            activeMenuPath: '/qualification-agency',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgency'),
    },
    {
        path: '/qualification-agency-view/:id',
        name: 'qualification-agency-view',
        meta: {
            title: '资质代办详细信息查看',
            activeMenuPath: '/qualification-agency',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgencyView'),
    },
    {
        path: '/qualification-agency-detail',
        name: 'qualification-agency-detail',
        meta: {
            title: '资质代办详细信息查看',
            activeMenuPath: '/qualification-agency',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgencyDetail'),
    },
    {
        path: '/qualification-agency-add',
        name: 'qualification-agency-add',
        meta: {
            title: '资质代办添加',
            activeMenuPath: '/qualification-agency',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgencyAdd'),
    },
    {
        path: '/qualification-agency-edit/:id',
        name: 'qualification-agency-edit',
        meta: {
            title: '资质代办编辑',
            activeMenuPath: '/qualification-agency',
        },
        component: () => import('../../../views/management-business/qualification-agency/QualificationAgencyEdit'),
    },
    {
        path: '/title-evaluation',
        name: 'title-evaluation',
        meta: {
            title: '职称评审列表',
            activeMenuPath: '/title-evaluation',
        },
        component: () => import('../../../views/management-business/title-evaluation/TitleEvaluation'),
    },
    {
        path: '/title-evaluation-view',
        name: 'title-evaluation-view',
        meta: {
            title: '职称评审查看',
            activeMenuPath: '/title-evaluation',
        },
        component: () => import('../../../views/management-business/title-evaluation/TitleEvaluationView'),
    },
    {
        path: '/title-evaluation-add',
        name: 'title-evaluation-add',
        meta: {
            title: '职称评审添加',
            activeMenuPath: '/title-evaluation',
        },
        component: () => import('../../../views/management-business/title-evaluation/TitleEvaluationAdd'),
    },
    {
        path: '/title-evaluation-edit',
        name: 'title-evaluation-edit',
        meta: {
            title: '职称评审编辑',
            activeMenuPath: '/title-evaluation',
        },
        component: () => import('../../../views/management-business/title-evaluation/TitleEvaluationEdit'),
    },
    {
        path: '/class-three-personnel',
        name: 'class-three-personnel',
        meta: {
            title: '三类人员列表',
            activeMenuPath: '/class-three-personnel',
        },
        component: () => import('../../../views/management-business/class-three-personnel/ClassThreePersonnel'),
    },
    {
        path: '/class-three-personnel-view',
        name: 'class-three-personnel-view',
        meta: {
            title: '三类人员查看',
            activeMenuPath: '/class-three-personnel',
        },
        component: () => import('../../../views/management-business/class-three-personnel/ClassThreePersonnel'),
    },
    {
        path: '/class-three-personnel-add',
        name: 'class-three-personnel-add',
        meta: {
            title: '三类人员添加',
            activeMenuPath: '/class-three-personnel',
        },
        component: () => import('../../../views/management-business/class-three-personnel/ClassThreePersonnel'),
    },
    {
        path: '/class-three-personnel-edit',
        name: 'class-three-personnel-edit',
        meta: {
            title: '三类人员添加',
            activeMenuPath: '/class-three-personnel',
        },
        component: () => import('../../../views/management-business/class-three-personnel/ClassThreePersonnel'),
    },
    {
        path: '/education-promotion',
        name: 'education-promotion',
        meta: {
            title: '学历提升列表',
            activeMenuPath: '/education-promotion',
        },
        component: () => import('../../../views/management-business/education-promotion/EducationPromotion'),
    },
    {
        path: '/education-promotion-view',
        name: 'education-promotion-view',
        meta: {
            title: '学历提升查看',
            activeMenuPath: '/education-promotion',
        },
        component: () => import('../../../views/management-business/education-promotion/EducationPromotion'),
    },
    {
        path: '/education-promotion-add',
        name: 'education-promotion-add',
        meta: {
            title: '学历提升添加',
            activeMenuPath: '/education-promotion',
        },
        component: () => import('../../../views/management-business/education-promotion/EducationPromotion'),
    },
    {
        path: '/education-promotion-edit',
        name: 'education-promotion-edit',
        meta: {
            title: '学历提升编辑',
            activeMenuPath: '/education-promotion',
        },
        component: () => import('../../../views/management-business/education-promotion/EducationPromotion'),
    },
]

export default businessRoutes
