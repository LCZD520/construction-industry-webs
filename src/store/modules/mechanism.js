/**
 * Created by Lv Cheng on 2022/7/23
 * Notes
 */

const mechanisms = {
    namespaced: true,
    state: () => ({
        // 机构列表树
        listMechanisms: [],
    }),
    mutations: {
        INIT_LIST_MECHANISMS(state, data) {
            state.listMechanisms = data
        },
    },
    actions: {
        initListMechanisms({commit}, data) {
            commit('INIT_LIST_MECHANISMS', data)
        },
    }
}

export default mechanisms

