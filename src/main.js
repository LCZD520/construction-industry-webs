import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import qs from 'qs'
import axios from "axios";
import {http} from './request/request'
// animate动画库
import animated from "animate.css";
import './assets/css/reset.css'
// 图片放大插件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
// Echarts图表库
import * as echarts from "echarts";
// ElementUI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'

import {provinceAndCityData} from "_element-china-area-data@5.0.2@element-china-area-data";
Vue.use(animated)
Vue.use(Viewer)
Vue.use(ElementUI)

Vue.prototype.$provinceAndCityData = provinceAndCityData;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
