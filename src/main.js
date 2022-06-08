import Vue from 'vue'

import {request, requestToken} from './request/request'

import animated from "animate.css";
import './assets/css/reset.css'

Vue.use(animated)

Vue.prototype.$http = axios;
Vue.prototype.$axios = request;
Vue.prototype.$axios2 = requestToken;

import qs from 'qs'

// 导入 ElementUI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.prototype.$qs = qs;


import App from './App.vue'
import store from './store'
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
