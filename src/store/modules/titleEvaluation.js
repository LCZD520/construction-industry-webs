/**
 * Created by Lv Cheng on 2022/7/23
 * Notes 职称评审
 */

const titleEvaluation = {
    namespaced: true,
    state: () => ({
        // 职称评审详情
        titleEvaluationDetail: {},
    }),
    mutations: {
        TITLE_EVALUATION_DETAIL(state, data) {
            state.titleEvaluationDetail = data
        },
    },
    actions: {
        updateTitleEvaluationDetail({commit}, data) {
            commit('TITLE_EVALUATION_DETAIL', data)
        },
    }
}

export default titleEvaluation

