/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 系统管理模块 路由配置
 */

const systemRoutes = [
    {
        path: '/operation-log',
        name: 'operation-log',
        meta: {
            title: '操作日志',
        },
        component: () => import('../../../views/management-system/operation-log/OperationLog'),
    },
    {
        path: '/system-notice',
        name: 'system-notice',
        meta: {
            title: '系统公告',
        },
        component: () => import('../../../views/management-system/system-notice/SystemNotice'),
    },
    {
        path: '/data-transfer',
        name: 'data-transfer',
        meta: {
            title: '数据转移',
        },
        component: () => import('../../../views/management-system/data-transfer/DataTransfer'),
    },
    {
        path: '/certificate-category',
        name: 'certificate-category',
        meta: {
            title: '证书类别',
        },
        component: () => import('../../../views/management-system/certificate-category/CertificateCategory'),
    },
    {
        path: '/qualification-category',
        name: 'qualification-category',
        meta: {
            title: '资质类别',
        },
        component: () => import('../../../views/management-system/qualification-category/QualificationCategory'),
    },
    {
        path: '/company-account',
        name: 'company-account',
        meta: {
            title: '公司账户',
        },
        component: () => import('../../../views/management-system/company-account/CompanyAccount'),
    },
    {
        path: '/management-approval',
        name: 'management-approval',
        meta: {
            title: '审批管理',
        },
        component: () => import('../../../views/management-system/management-approval/ManagementApproval'),
    },
    {
        path: '/advanced-setting',
        name: 'advanced-setting',
        meta: {
            title: '高级设置',
        },
        component: () => import('../../../views/management-system/advanced-setting/AdvancedSetting'),
    }
]

export default systemRoutes
