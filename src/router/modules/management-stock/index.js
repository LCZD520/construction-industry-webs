/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 库存管理模块 路由配置
 */

const stockRoutes = [
    {
        path: '/lib-certificate',
        name: 'lib-certificate',
        meta: {
            title: '证件库列表',
            activeMenuPath: '/lib-certificate'
        },
        component: () => import('../../../views/management-stock/lib-certificate/LibCertificate'),
    },
    {
        path: '/lib-certificate-view/:id',
        name: 'lib-certificate-view',
        meta: {
            title: '证件库查看',
            activeMenuPath: '/lib-certificate'
        },
        component: () => import('../../../views/management-stock/lib-certificate/LibCertificateView'),
    },
]

export default stockRoutes
