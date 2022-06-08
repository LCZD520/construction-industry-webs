/**
 * Created by Lv Cheng on 2022/2/26
 * Notes
 */

import axios from "axios";

export const request = config => {
    const instance = axios.create({
        timeout: 5000
    });
    // 响应拦截器
    instance.interceptors.response.use(config => {
        return config.data
    })
    return instance(config)
}
export const requestToken = config => {
    const instance = axios.create({
        headers: {
            Authorization: localStorage.getItem("access_token")
        },
        timeout: 5000
    });
    // 响应拦截器
    instance.interceptors.response.use(config => {
        return config.data
    })
    return instance(config)
}
