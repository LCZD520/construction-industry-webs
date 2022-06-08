/**
 * Created by Lv Cheng on 2022/3/6
 * Notes
 */

import Vue from 'vue'
import Vuex from 'vuex'

// vuex持久化
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 登录状态
        loginStatus: false,
        // 侧边栏菜单
        listMenus: []
    },
    mutations: {
        CHANGE_LOGIN_STATUS() {
            this.state.loginStatus = !this.state.loginStatus
        },
        INIT_LIST_MENUS(state, result) {
            this.state.listMenus = result
        },
    },
    actions: {
        changeLoginStatus({commit}) {
            commit("CHANGE_LOGIN_STATUS")
        },
        initListMenus({commit}, data) {
            console.log(data)
            commit("INIT_LIST_MENUS", data)
        }
    },
    modules: {},
    plugins: [vuexLocal.plugin]
})
