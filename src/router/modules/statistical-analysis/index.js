/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 统计分析模块 路由配置
 */

const statisticsRoutes = [
    {
        path: '/statistics-input-quantity',
        name: 'statistics-input-quantity ',
        meta: {
            title: '录入量统计',
        },
        component: () => import('../../../views/statistical-analysis/statistics-input-quantity/StatisticsInputQuantity'),
    },
    {
        path: '/statistics-certificate',
        name: 'statistics-certificate',
        meta: {
            title: '证书统计',
        },
        component: () => import('../../../views/statistical-analysis/statistics-certificate/StatisticsCertificate'),
    }
]

export default statisticsRoutes
