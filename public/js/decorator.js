(function () {

    /**
     * 节流，一定时间内，只能触发一次操作
     * @export
     * @param {Number} delay - 延迟时间
     * @returns
     */
    function throttle(delay = 100) {
        //返回值：被传递给函数的对象。
        return function (target, name, descriptor) {
            // @param target 类本身
            // @param name 装饰的属性(方法)名称
            // @param descriptor 属性(方法)的描述对象
            const fn = descriptor.value
            let canRun = true
            descriptor.value = async function (...args) {
                //具体的装饰器业务在这里面编写
                if (!canRun) return
                await fn.apply(this, args) // 执行业务下的方法
                canRun = false
                setTimeout(() => {
                    canRun = true
                }, delay)
            }
        }
    }

    /**
     * 记录日志
     * @param args
     * @returns {function(*, *, *): void}
     */
    function log(args) {
        //返回值：被传递给函数的对象。
        return function (target, name, descriptor) {
            const fn = descriptor.value;
            console.log(fn.name, "fn")
            descriptor.value = async function (...args) {
                const startDate = new Date()
                const timeStamp = startDate.getTime()
                let start = dateFormat(startDate)
                console.log(`方法【${fn.name}】执行开始 【${start}】`)
                await fn.apply(this, args);
                const endDate = new Date()
                const timeStamp2 = endDate.getTime()
                let end = dateFormat(endDate)
                console.log(`方法【${fn.name}】执行完毕 【${end}] 耗时【${timeStamp2 - timeStamp}】ms`)
            }
        }
    }

    /**
     * 调用栈
     * @param args
     * @returns {function(*, *, *): void}
     */
    function trace(args) {
        //返回值：被传递给函数的对象。
        return function (target, name, descriptor) {
            const fn = descriptor.value;
            descriptor.value = async function (...args) {
                await fn.apply(this, args);
                console.trace(`方法【${fn.name}】调用栈】`)
            }
        }
    }

    /**
     * 防抖，连续操作时，只在最后一次触发
     * @export
     * @param {Number} delay - 延迟时间
     * @returns
     */
    function debounce(delay = 1000) {
        return function (target, name, descriptor) {
            const fn = descriptor.value
            let timer = null
            descriptor.value = function (...args) {
                const _this = this._isVue ? this : target
                clearTimeout(timer)
                timer = setTimeout(() => {
                    fn.apply(_this, args)
                }, delay)
            }
        }
    }

    /**
     * 方法调用前执行
     * @returns {function(*, *, *): void}
     */
    function before() {
        return function (target, name, descriptor) {
            const fn = descriptor.value;
            descriptor.value = async function (...args) {
                console.log('业务执行之前处理..............')
                await fn.apply(this, args);
            }
        }
    }

    /**
     * 方法调用后执行
     * @returns {function(*, *, *): void}
     */
    function after() {
        return function (target, name, descriptor) {
            const fn = descriptor.value;
            descriptor.value = async function (...args) {
                await fn.apply(this, args);
                console.log('业务执行之后处理..............')
            }
        }
    }

    function dateFormat(date) {
        let year = date.getFullYear();
        let month = fillZero(date.getMonth() + 1);
        let day = fillZero(date.getDate());
        let hours = fillZero(date.getHours());
        let minutes = fillZero(date.getMinutes());
        let second = fillZero(date.getSeconds());
        let str = '';
        str = str + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + second
        return str
    }

    function fillZero(t) {
        return t >= 10 ? t : '0' + t
    }

    this.throttle = throttle
    this.log = log
    this.debounce = debounce
    this.trace = trace
    this.before = before
    this.after = after

})()
