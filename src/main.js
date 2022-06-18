import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import axios from "axios";
import qs from 'qs'
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
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(animated)
Vue.use(Viewer)
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
