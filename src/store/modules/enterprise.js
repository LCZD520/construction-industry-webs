/**
 * Created by Lv Cheng on 2022/7/23
 * Notes
 */

const enterprise = {
    namespaced: true,
    state: () => ({
        // 企业详情
        enterpriseDetail: {}
    }),
    mutations: {
        ENTERPRISE_DETAIL(state, data) {
            state.enterpriseDetail = data
        }
    },
    actions: {
        enterpriseDetail({commit}, data) {
            commit('ENTERPRISE_DETAIL', data)
        }
    }
}

export default enterprise

