/**
 * Created by Lv Cheng on 2022/2/26
 * Notes
 */

import axios from "axios";
import {Message} from 'element-ui'

export default class Http {
    instance
    instance2

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
            return config.data
        }, (error) => {
            console.log(error)
            // Message.error("服务器出现异常，请联系管理员！")
            // return Promise.reject(error)
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
            return config.data
        }, (error) => {
            Message.error("服务器出现异常，请联系管理员！")
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

}
