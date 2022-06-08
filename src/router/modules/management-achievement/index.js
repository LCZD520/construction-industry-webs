/**
 * Created by Lv Cheng on 2022/6/9
 * Notes 业绩管理模块 路由配置
 */

const achievementRoutes = [
    {
        path: '/achievement-talent',
        name: 'achievement-talent',
        meta: {
            title: '人才业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-talent/AchievementTalent'),
    },
    {
        path: '/achievement-qualification-transfer',
        name: 'achievement-qualification-transfer',
        meta: {
            title: '资质转让业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-transfer/AchievementQualificationTransfer'),
    },
    {
        path: '/achievement-qualification-agency',
        name: 'achievement-qualification-agency',
        meta: {
            title: '资质代办业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-qualification-agency/AchievementQualificationAgency'),
    },
    {
        path: '/achievement-title-evaluation',
        name: 'achievement-title-evaluation',
        meta: {
            title: '职称评审业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-title-evaluation/AchievementTitleEvaluation'),
    },
    {
        path: '/achievement-class-three-personnel',
        name: 'achievement-class-three-personnel',
        meta: {
            title: '三类人员业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-class-three-personnel/AchievementClassThreePersonnel'),
    },
    {
        path: '/achievement-education-promotion',
        name: 'achievement-education-promotion',
        meta: {
            title: '学历提升业绩',
        },
        component: () => import('../../../views/management-achievement/achievement-education-promotion/AchievementEducationPromotion'),
    }
]

export default achievementRoutes
