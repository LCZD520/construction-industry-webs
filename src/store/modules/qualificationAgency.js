/**
 * Created by Lv Cheng on 2022/7/23
 * Notes
 */

const qualificationAgency = {
    namespaced: true,
    state: () => ({
        // 资质代办需求清单
        qualificationAgencyDemand: [],
        qualificationAgencyDetail: {},
    }),
    mutations: {
        QUALIFICATION_AGENCY_DETAIL(state, data) {
            state.qualificationAgencyDetail = data
        },
        QUALIFICATION_AGENCY_DEMAND(state, data) {
            state.qualificationAgencyDemand = data
        }
    },
    actions: {
        updateQualificationAgencyDemand({commit}, data) {
            commit('QUALIFICATION_AGENCY_DEMAND', data)
        },
        updateQualificationAgencyDetail({commit}, data) {
            commit('QUALIFICATION_AGENCY_DETAIL', data)
        },
    }
}

export default qualificationAgency

