/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 回收站 路由配置
 */

const recycleBinRoutes = [
    {
        path: '/talent-recovery',
        name: 'talent-recovery ',
        meta: {
            title: '已被删除人才查询列表',
            activeMenuPath: '/talent-recovery'
        },
        component: () => import('../../../views/recycle-bin/TalentRecovery'),
    },
    {
        path: '/enterprise-recovery',
        name: 'enterprise-recovery ',
        meta: {
            title: '已被删除企业查询列表',
            activeMenuPath: '/enterprise-recovery'
        },
        component: () => import('../../../views/recycle-bin/EnterpriseRecovery'),
    },
    {
        path: '/qualification-acquisition-recovery',
        name: 'qualification-acquisition-recovery ',
        meta: {
            title: '已被删除资质收购列表',
            activeMenuPath: '/qualification-acquisition-recovery'
        },
        component: () => import('../../../views/recycle-bin/QualificationAcquisitionRecovery'),
    },
    {
        path: '/qualification-transfer-recovery',
        name: 'qualification-transfer-recovery ',
        meta: {
            title: '已被删除资质转让列表',
            activeMenuPath: '/qualification-transfer-recovery'
        },
        component: () => import('../../../views/recycle-bin/QualificationTransferRecovery'),
    },
    {
        path: '/qualification-agency-recovery',
        name: 'qualification-agency-recovery',
        meta: {
            title: '已被删除资质代办列表',
            activeMenuPath: '/qualification-agency-recovery'
        },
        component: () => import('../../../views/recycle-bin/QualificationAgencyRecovery'),
    },
    {
        path: '/title-evaluation-recovery',
        name: 'title-evaluation-recovery',
        meta: {
            title: '已被删除职称评审列表',
            activeMenuPath: '/title-evaluation-recovery'
        },
        component: () => import('../../../views/recycle-bin/TitleEvaluationRecovery'),
    },
    {
        path: '/class-three-personnel-recovery',
        name: 'class-three-personnel-recovery',
        meta: {
            title: '已被删除三类人员列表',
            activeMenuPath: '/class-three-personnel-recovery'
        },
        component: () => import('../../../views/recycle-bin/ClassThreePersonnelRecovery'),
    },
    {
        path: '/education-promotion-recovery',
        name: 'education-promotion-recovery',
        meta: {
            title: '已被删除学历提升列表',
            activeMenuPath: '/education-promotion-recovery'
        },
        component: () => import('../../../views/recycle-bin/EducationPromotionRecovery'),
    },
]

export default recycleBinRoutes
