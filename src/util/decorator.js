import store from '../store'

/**
 * 确认执行删除操作
 * @returns {function(*, *, *): void}
 */
export function confirmDelete() {
    return function (target, name, descriptor) {
        const fn = descriptor.value;
        descriptor.value = async function (...args) {
            this.$confirm('确定要删除这条记录吗？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await fn.apply(this, args);
            }).catch(() => {
                this.$message.info('取消删除')
            })
        }
    }
}

export function loading() {
    return function (target, name, descriptor) {
        const fn = descriptor.value;
        descriptor.value = async function (...args) {
            this.$confirm('确定取消订单？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await store.dispatch('updateLoadingStatus', true)
                try {
                    await fn.apply(this, args)
                } catch (e) {
                    console.log(e)
                } finally {
                    await store.dispatch('updateLoadingStatus', false)
                }
            }).catch(() => {
                this.$message.info('已取消操作')
            })
        }
    }
}

/**
 * 暂未开放
 * @returns {function(*, *, *): void}
 */
export function unOpen() {
    return function (target, name, descriptor) {
        descriptor.value = async function (...args) {
            return Promise.resolve().then(_ => {
                this.$message.info('暂未开放')
            })
        }
    }
}
