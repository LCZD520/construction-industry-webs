/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 资源管理模块 路由配置
 */

const resourcesRoutes = [
    {
        path: '/my-talent-resources',
        name: 'my-talent-resources',
        meta: {
            title: '我的人才资源',
        },
        component: () => import('../../../views/management-resources/my-talent-resources/MyTalentResources'),
    },
    {
        path: '/summary-talent-resources',
        name: 'summary-talent-resources',
        meta: {
            title: '人才资源汇总',
        },
        component: () => import('../../../views/management-resources/summary-talent-resources/SummaryTalentResources'),
    },
    {
        path: '/sharing-talent-resources',
        name: 'sharing-talent-resources',
        meta: {
            title: '共享人才资源',
        },
        component: () => import('../../../views/management-resources/sharing-talent-resources/SharingTalentResources'),
    },
    {
        path: '/my-enterprise-resources',
        name: 'my-enterprise-resources',
        meta: {
            title: '我的企业资源',
        },
        component: () => import('../../../views/management-resources/my-enterprise-resources/MyEnterpriseResources'),
    },
    {
        path: '/summary-enterprise-resources',
        name: 'summary-enterprise-resources',
        meta: {
            title: '企业资源汇总',
        },
        component: () => import('../../../views/management-resources/summary-enterprise-resources/SummaryEnterpriseResources'),
    },
    {
        path: '/share-enterprise-resources',
        name: 'share-enterprise-resources',
        meta: {
            title: '共享企业资源',
        },
        component: () => import('../../../views/management-resources/share-enterprise-resources/ShareEnterpriseResources'),
    }
]

export default resourcesRoutes
