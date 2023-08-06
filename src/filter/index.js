/**
 * Created by Lv Cheng on 2023/4/5
 * Notes 全局过滤器
 */

/**
 * 级别-专业
 * @param val
 * @returns {string}
 */
const levelMajor = (val) => {
    return val.toString().replaceAll(',', ' / ')
}

export default {levelMajor}
