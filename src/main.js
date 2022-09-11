import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import qs from 'qs'
import Http from './request/request'
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

import {CodeToText, provinceAndCityData} from "_element-china-area-data@5.0.2@element-china-area-data";
// 防抖
Vue.directive('debounce', {
    inserted: function (el, binding) {
        let timer, flag;
        el.addEventListener('click', () => {
            if (!flag) {
                flag = true;
                timer && clearTimeout(timer);
                timer = setTimeout(() => {
                    typeof binding.value === 'function' && binding.value();
                    flag = false;
                }, 2000) //可通过指令传值设置计时时间
            }
        })
    }
})
//节流
Vue.directive('throttle', {
    inserted: function (el, binding) {
        let delay = 1000
        if (binding.arg) {
            delay = binding.arg / 1
        }
        let timer, flag;
        el.addEventListener('click', () => {
            if (!flag) {
                flag = true;
                typeof binding.value === 'function' && binding.value();
                timer && clearTimeout(timer);
                timer = setTimeout(() => {
                    flag = false;
                }, delay)
            }
        })
    }
})

const valueToLabel = (_val, _options) => {
    if (_val !== undefined && _val !== null) {
        let result = _options.find(k => {
            if (k.value === _val) {
                return k.label
            }
        })
        if (result !== undefined) {
            return result.label
        }
    }
}

Vue.use(animated)
Vue.use(Viewer)
Vue.use(ElementUI)

Vue.prototype.$valueToLabel = valueToLabel
Vue.prototype.$provinceAndCityData = provinceAndCityData
Vue.prototype.$CodeToText = CodeToText
Vue.prototype.$provinceAndCityDataNull = [
    {
        children: null,
        label: "无",
        value: "000000"
    }
].concat(provinceAndCityData),
    Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs
Vue.prototype.$http = new Http()

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
