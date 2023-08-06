/**
 * Created by Lv Cheng on 2022/7/23
 * Notes 学历提升
 */

const educationPromotion = {
    namespaced: true,
    state: () => ({
        // 学历提升详情
        educationPromotionDetail: {},
    }),
    mutations: {
        EDUCATION_PROMOTION_DETAIL(state, data) {
            state.educationPromotionDetail = data
        },
    },
    actions: {
        updateEducationPromotionDetail({commit}, data) {
            commit('EDUCATION_PROMOTION_DETAIL', data)
        },
    }
}

export default educationPromotion

