/**
 * Created by Lv Cheng on 2022/2/26
 * Notes
 */
import axios from "axios";
import router from "../router";
import {Message} from 'element-ui'
import '../../public/js/decorator'

export default class Http {
    constructor() {
        this.instance = axios.create({
            timeout: 5000
        })
        // 请求拦截器
        this.instance.interceptors.request.use(config => {
            config.url = '/api' + config.url
            config.headers = {
                Authorization: localStorage.getItem("access_token")
            }
            return config
        })
        // 响应拦截器
        this.instance.interceptors.response.use(config => {
            if (config.data.code === '403') {
                this.message(config.data.message)
            }
            if (config.data.code === '4001') {
                this.message(config.data.message)
                localStorage.clear()
                router.push('/login')
            }
            return config.data
        }, error => {
            (error.code === 'ECONNABORTED' || error.message.includes('timeout')) && this.message("请求超时，请刷新后重试!")
            if (error.response && error.response.status === 500) {
                this.message("服务器出现异常，请联系管理员！")
            }
            return Promise.reject(error)
        })
        this.instance2 = axios.create({
            timeout: 5000
        })
        // 请求拦截器
        this.instance2.interceptors.request.use(config => {
            config.url = '/api' + config.url
            return config
        })
        // 响应拦截器
        this.instance2.interceptors.response.use(config => {
            if (config.data.code === '403') {
                this.message(config.data.message)
            }
            if (config.data.code === '4001') {
                this.message(config.data.message)
                localStorage.clear()
                router.push('/login')
            }
            return config.data
        }, error => {
            (error.code === 'ECONNABORTED' || error.message.includes('timeout')) && this.message("请求超时，请刷新后重试!")
            if (error.response && error.response.status === 500) {
                this.message("服务器出现异常，请联系管理员！")
            }
            return Promise.reject(error)
        })
    }

    get(url, config, isNeedToken = true) {
        if (isNeedToken) {
            return this.instance.get(url, config)
        }
        return this.instance2.get(url, config)
    }

    post(url, data = {}, isNeedToken = true) {
        if (isNeedToken) {
            return this.instance.post(url, data)
        }
        return this.instance2.post(url, data)
    }

    put(url, data = {}, isNeedToken = true) {
        if (isNeedToken) {
            return this.instance.put(url, data)
        }
        return this.instance2.put(url, data)
    }

    delete(url, data = {}, isNeedToken = true) {
        if (isNeedToken) {
            return this.instance.delete(url, data)
        }
        return this.instance2.delete(url, data)
    }

    @throttle()
    message(message) {
        Message.error(message)
    }

}
