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
        path: '/system-notice-view',
        name: 'system-notice-view',
        meta: {
            title: '系统公告查看',
        },
        component: () => import('../../../views/management-system/system-notice/SystemNoticeView'),
    },
    {
        path: '/system-notice-add',
        name: 'system-notice-add',
        meta: {
            title: '系统公告添加',
        },
        component: () => import('../../../views/management-system/system-notice/SystemNoticeAdd'),
    },
    {
        path: '/system-notice-edit',
        name: 'system-notice-edit',
        meta: {
            title: '系统公告编辑',
        },
        component: () => import('../../../views/management-system/system-notice/SystemNoticeEdit'),
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
        path: '/company-account-view',
        name: 'company-account-view',
        meta: {
            title: '公司账户查看',
        },
        component: () => import('../../../views/management-system/company-account/CompanyAccountView'),
    },
    {
        path: '/company-account-add',
        name: 'company-account-add',
        meta: {
            title: '公司账户添加',
        },
        component: () => import('../../../views/management-system/company-account/CompanyAccountAdd'),
    },
    {
        path: '/company-account-edit',
        name: 'company-account-edit',
        meta: {
            title: '公司账户编辑',
        },
        component: () => import('../../../views/management-system/company-account/CompanyAccountEdit'),
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
    },
    {
        path: '/advanced-setting-add',
        name: 'advanced-setting-add',
        meta: {
            title: '高级设置添加',
        },
        component: () => import('../../../views/management-system/advanced-setting/AdvancedSettingAdd'),
    },
    {
        path: '/advanced-setting-edit',
        name: 'advanced-setting-edit',
        meta: {
            title: '高级设置',
        },
        component: () => import('../../../views/management-system/advanced-setting/AdvancedSettingEdit'),
    },
]

export default systemRoutes
