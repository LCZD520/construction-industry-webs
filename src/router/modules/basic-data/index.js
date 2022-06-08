/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 基础数据模块 路由配置
 */

const basicDataRoutes = [
    {
        path: '/management-role',
        name: 'management-role',
        meta: {
            title: '角色管理',
        },
        component: () => import('../../../views/basic-data/management-role/ManagementRole'),
    },
    {
        path: '/management-organization',
        name: 'management-organization',
        meta: {
            title: '组织管理',
        },
        component: () => import('../../../views/basic-data/management-organization/ManagementOrganization'),
    }
]

export default basicDataRoutes
