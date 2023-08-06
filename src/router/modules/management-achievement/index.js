/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 业绩管理模块 路由配置
 */

const achievementRoutes = [
    {
        path: '/achievement-talent',
        name: 'achievement-talent',
        meta: {
            title: '人才业绩列表',
            activeMenuPath: '/achievement-talent',
        },
        component: () => import('../../../views/management-achievement/achievement-talent/AchievementTalent'),
    },
    {
        path: '/achievement-talent-view',
        name: 'achievement-talent-view',
        meta: {
            title: '人才业绩查看',
            activeMenuPath: '/achievement-talent',
        },
        component: () => import('../../../views/management-achievement/achievement-talent/AchievementTalentView'),
    },
    {
        path: '/achievement-qualification-transfer',
        name: 'achievement-qualification-transfer',
        meta: {
            title: '资质转让业绩',
            activeMenuPath: '/achievement-qualification-transfer',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-transfer/AchievementQualificationTransfer'),
    },
    {
        path: '/achievement-qualification-transfer-view',
        name: 'achievement-qualification-transfer-view',
        meta: {
            title: '资质转让业绩查看',
            activeMenuPath: '/achievement-qualification-transfer',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-transfer/AchievementQualificationTransferView'),
    },
    {
        path: '/achievement-qualification-agency',
        name: 'achievement-qualification-agency',
        meta: {
            title: '资质代办业绩列表',
            activeMenuPath: '/achievement-qualification-agency',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-agency/AchievementQualificationAgency'),
    },
    {
        path: '/achievement-qualification-agency-view',
        name: 'achievement-qualification-agency-view',
        meta: {
            title: '资质代办业绩查看',
            activeMenuPath: '/achievement-qualification-agency',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-agency/AchievementQualificationAgencyView'),
    },
    {
        path: '/achievement-title-evaluation',
        name: 'achievement-title-evaluation',
        meta: {
            title: '职称评审业绩列表',
            activeMenuPath: '/achievement-title-evaluation',
        },
        component: () => import('../../../views/management-achievement/achievement-title-evaluation/AchievementTitleEvaluation'),
    },
    {
        path: '/achievement-class-three-personnel-view',
        name: 'achievement-title-evaluation-view',
        meta: {
            title: '职称评审业绩查看',
            activeMenuPath: '/achievement-title-evaluation',
        },
        component: () => import('../../../views/management-achievement/achievement-title-evaluation/AchievementTitleEvaluationView'),
    },
    {
        path: '/achievement-class-three-personnel',
        name: 'achievement-class-three-personnel',
        meta: {
            title: '三类人员业绩列表',
            activeMenuPath: '/achievement-class-three-personnel',
        },
        component: () => import('../../../views/management-achievement/achievement-class-three-personnel/AchievementClassThreePersonnel'),
    },
    {
        path: '/achievement-class-three-personnel-view',
        name: 'achievement-class-three-personnel-view',
        meta: {
            title: '三类人员业绩查看',
            activeMenuPath: '/achievement-class-three-personnel',
        },
        component: () => import('../../../views/management-achievement/achievement-class-three-personnel/AchievementClassThreePersonnelView'),
    },
    {
        path: '/achievement-education-promotion',
        name: 'achievement-education-promotion',
        meta: {
            title: '学历提升业绩列表',
            activeMenuPath: '/achievement-education-promotion',
        },
        component: () => import('../../../views/management-achievement/achievement-education-promotion/AchievementEducationPromotion'),
    },
    {
        path: '/achievement-education-promotion-view',
        name: 'achievement-education-promotion-view',
        meta: {
            title: '学历提升业绩查看',
            activeMenuPath: '/achievement-education-promotion',
        },
        component: () => import('../../../views/management-achievement/achievement-education-promotion/AchievementEducationPromotionView'),
    }
]

export default achievementRoutes
