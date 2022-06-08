/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 后勤管理模块 路由配置
 */

const logisticsRoutes = [
    {
        path: '/confirm-logistics',
        name: 'confirm-logistics',
        meta: {
            title: '后勤确认',
        },
        component: () => import('../../../views/management-logistics/confirm-logistics/ConfirmLogistics'),
    }
]

export default logisticsRoutes
