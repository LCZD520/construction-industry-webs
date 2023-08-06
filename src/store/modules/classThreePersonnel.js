/**
 * Created by Lv Cheng on 2022/7/23
 * Notes 三类人员
 */

const classThreePersonnel = {
    namespaced: true,
    state: () => ({
        // 三类人员详情
        classThreePersonnelDetail: {},
    }),
    mutations: {
        CLASS_THREE_PERSONNEL_DETAIL(state, data) {
            state.classThreePersonnelDetail = data
        },
    },
    actions: {
        updateClassThreePersonnelDetail({commit}, data) {
            commit('CLASS_THREE_PERSONNEL_DETAIL', data)
        },
    }
}

export default classThreePersonnel

