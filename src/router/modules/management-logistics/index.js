/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 后勤管理模块 路由配置
 */

const logisticsRoutes = [
    {
        path: '/confirm-logistics',
        name: 'confirm-logistics',
        meta: {
            title: '人才后勤确认列表',
            activeMenuPath: '/confirm-logistics'
        },
        component: () => import('../../../views/management-logistics/confirm-logistics/ConfirmLogistics'),
    },
    {
        path: '/confirm-logistics-view/:id',
        name: 'confirm-logistics-view',
        meta: {
            title: '后勤确认查看',
            activeMenuPath: '/confirm-logistics'
        },
        component: () => import('../../../views/management-logistics/confirm-logistics/ConfirmLogisticsView'),
    },
]

export default logisticsRoutes
