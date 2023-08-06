/**
 * Created by Lv Cheng on 2022/10/22
 * Notes
 */
export default class CommonUtil {
    static debounce(fn, delay) {
        let time = null;//time用来控制事件的触发
        return function () {
            if (time !== null) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                fn.call(this);
                //利用call(),让this的指针从指向window 转成指向input
            }, delay)
        }
    }
}
