/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 资源管理模块 路由配置
 */

const resourcesRoutes = [
    {
        path: '/my-talent-resources',
        name: 'my-talent-resources',
        meta: {
            title: '人才资源列表',
            activeMenuPath: '/my-talent-resources'
        },
        component: () => import('../../../views/management-resources/my-talent-resources/MyTalentResources'),
    },
    {
        path: '/my-talent-resources-view',
        name: 'my-talent-resources-view',
        meta: {
            title: '人才资源查看',
            activeMenuPath: '/my-talent-resources'
        },
        component: () => import('../../../views/management-resources/my-talent-resources/MyTalentResourcesView'),
    },
    {
        path: '/my-talent-resources-add',
        name: 'my-talent-resources-add',
        meta: {
            title: '人才资源添加',
            activeMenuPath: '/my-talent-resources'
        },
        component: () => import('../../../views/management-resources/my-talent-resources/MyTalentResourcesAdd'),
    },
    {
        path: '/my-talent-resources-edit',
        name: 'my-talent-resources-edit',
        meta: {
            title: '人才资源编辑',
            activeMenuPath: '/my-talent-resources'
        },
        component: () => import('../../../views/management-resources/my-talent-resources/MyTalentResourcesEdit'),
    },
    {
        path: '/summary-talent-resources',
        name: 'summary-talent-resources',
        meta: {
            title: '人才资源汇总列表',
            activeMenuPath: '/summary-talent-resources'
        },
        component: () => import('../../../views/management-resources/summary-talent-resources/SummaryTalentResources'),
    },
    {
        path: '/summary-talent-resources-view',
        name: 'summary-talent-resources-view',
        meta: {
            title: '人才资源汇总查看',
            activeMenuPath: '/summary-talent-resources'
        },
        component: () => import('../../../views/management-resources/summary-talent-resources/SummaryTalentResourcesView'),
    },
    {
        path: '/summary-talent-resources-add',
        name: 'summary-talent-resources-add',
        meta: {
            title: '人才资源添加',
            activeMenuPath: '/summary-talent-resources'
        },
        component: () => import('../../../views/management-resources/summary-talent-resources/SummaryTalentResourcesAdd'),
    },
    {
        path: '/summary-talent-resources-edit',
        name: 'summary-talent-resources-edit',
        meta: {
            title: '人才资源编辑',
            activeMenuPath: '/summary-talent-resources'
        },
        component: () => import('../../../views/management-resources/summary-talent-resources/SummaryTalentResourcesEdit'),
    },
    {
        path: '/sharing-talent-resources',
        name: 'sharing-talent-resources',
        meta: {
            title: '共享人才资源列表',
            activeMenuPath: '/sharing-talent-resources'
        },
        component: () => import('../../../views/management-resources/sharing-talent-resources/SharingTalentResources'),
    },
    {
        path: '/sharing-talent-resources-view',
        name: 'sharing-talent-resources-view',
        meta: {
            title: '人才资源查看',
            activeMenuPath: '/sharing-talent-resources'
        },
        component: () => import('../../../views/management-resources/sharing-talent-resources/SharingTalentResourcesView'),
    },
    {
        path: '/my-enterprise-resources',
        name: 'my-enterprise-resources',
        meta: {
            title: '企业资源列表',
            activeMenuPath: '/my-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/my-enterprise-resources/MyEnterpriseResources'),
    },
    {
        path: '/my-enterprise-resources-view',
        name: 'my-enterprise-resources-view',
        meta: {
            title: '企业资源查看',
            activeMenuPath: '/my-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/my-enterprise-resources/MyEnterpriseResourcesView'),
    },
    {
        path: '/my-enterprise-resources-add',
        name: 'my-enterprise-resources-add',
        meta: {
            title: '企业资源添加',
            activeMenuPath: '/my-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/my-enterprise-resources/MyEnterpriseResourcesAdd'),
    },
    {
        path: '/my-enterprise-resources-edit',
        name: 'my-enterprise-resources-edit',
        meta: {
            title: '企业资源编辑',
            activeMenuPath: '/my-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/my-enterprise-resources/MyEnterpriseResourcesEdit'),
    },
    {
        path: '/summary-enterprise-resources',
        name: 'summary-enterprise-resources',
        meta: {
            title: '企业资源汇总列表',
            activeMenuPath: '/summary-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/summary-enterprise-resources/SummaryEnterpriseResources'),
    },
    {
        path: '/summary-enterprise-resources-view',
        name: 'summary-enterprise-resources-view',
        meta: {
            title: '企业资源查看',
            activeMenuPath: '/summary-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/summary-enterprise-resources/SummaryEnterpriseResourcesView'),
    },
    {
        path: '/summary-enterprise-resources-add',
        name: 'summary-enterprise-resources-add',
        meta: {
            title: '企业资源添加',
            activeMenuPath: '/summary-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/summary-enterprise-resources/SummaryEnterpriseResourcesAdd'),
    },
    {
        path: '/summary-enterprise-resources-edit',
        name: 'summary-enterprise-resources-edit',
        meta: {
            title: '企业资源编辑',
            activeMenuPath: '/summary-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/summary-enterprise-resources/SummaryEnterpriseResourcesEdit'),
    },
    {
        path: '/share-enterprise-resources',
        name: 'share-enterprise-resources',
        meta: {
            title: '共享企业资源列表',
            activeMenuPath: '/share-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/share-enterprise-resources/ShareEnterpriseResources'),
    },
    {
        path: '/share-enterprise-resources-view',
        name: 'share-enterprise-resources-view',
        meta: {
            title: '企业资源查看',
            activeMenuPath: '/share-enterprise-resources'
        },
        component: () => import('../../../views/management-resources/share-enterprise-resources/ShareEnterpriseResourcesView'),
    }
]

export default resourcesRoutes
