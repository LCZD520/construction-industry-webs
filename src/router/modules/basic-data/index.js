/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 基础数据模块 路由配置
 */

const basicDataRoutes = [
    {
        path: '/management-role',
        name: 'management-role',
        meta: {
            title: '角色列表',
            activeMenuPath: '/management-role',
        },
        component: () => import('../../../views/basic-data/management-role/ManagementRole'),
    },
    {
        path: '/management-role-add',
        name: 'management-role-add',
        meta: {
            title: '角色添加',
            activeMenuPath: '/management-role',
        },
        component: () => import('../../../views/basic-data/management-role/ManagementRoleAdd'),
    },
    {
        path: '/management-role-edit',
        name: 'management-role-edit',
        meta: {
            title: '角色编辑',
            activeMenuPath: '/management-role',
        },
        component: () => import('../../../views/basic-data/management-role/ManagementRoleEdit'),
    },
    {
        path: '/management-role-set-permissions',
        name: 'management-role-set-permissions',
        meta: {
            title: '设置权限',
            activeMenuPath: '/management-role',
        },
        component: () => import('../../../views/basic-data/management-role/ManagementRoleSetPermissions'),
    },
    {
        path: '/management-organization',
        name: 'management-organization',
        meta: {
            title: '用户列表',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganization'),
    },
    {
        path: '/management-organization-view/:id',
        name: 'management-organization-view',
        meta: {
            title: '用户查看',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganizationView'),
    },
    {
        path: '/management-organization-add',
        name: 'management-organization-add',
        meta: {
            title: '用户添加',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganizationAdd'),
    },
    {
        path: '/management-organization-edit/:id',
        name: 'management-organization-edit',
        meta: {
            title: '用户编辑',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganizationEdit'),
    },
    {
        path: '/institution-add',
        name: 'institution-add',
        meta: {
            title: '机构添加',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/management-institution/InstitutionAdd'),
    },
    {
        path: '/institution-edit/:id',
        name: 'institution-edit',
        meta: {
            title: '机构编辑',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/management-institution/InstitutionEdit'),
    },
    {
        path: '/management-permission',
        name: 'management-permission',
        meta: {
            title: '权限数据管理',
            activeMenuPath: '/management-permission',
        },
        component: () => import('../../../views/basic-data/management-permission/ManagementPermission'),
    },
]

export default basicDataRoutes
