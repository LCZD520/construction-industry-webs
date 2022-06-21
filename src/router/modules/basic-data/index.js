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
        path: '/management-organization-view',
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
        path: '/management-organization-edit',
        name: 'management-organization-edit',
        meta: {
            title: '用户编辑',
            activeMenuPath: '/management-organization',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganizationEdit'),
    },
]

export default basicDataRoutes
