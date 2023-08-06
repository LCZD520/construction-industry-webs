<template>
  <div id="app">
    <VueScrollx :scrolling-x="false" :scrolling-y="false">
      <el-container v-if="this.$route.path === '/login'">
        <router-view/>
      </el-container>
      <Layout v-else/>
      <CommonLoadingEx v-if="$store.state.loading"/>
    </VueScrollx>
  </div>
</template>

<script>

import Layout from "./layout/Layouts";
import VueScrollx from "./components/vue-scrollx/VueScrollx";
import CommonLoadingEx from "./components/CommonLoadingEx";

export default {
  name: 'App',
  components: {CommonLoadingEx, VueScrollx, Layout},
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      worker: null,
    }
  },
  created() {
    // console.log(this.worker)
    // this.worker = this.$worker.run(n => n + 1, [2])
    //     .then(res => {
    //           console.log(res, "res")
    //           this.fn(10)
    //         }
    //     ).catch(e => console.log(e))
  },
  methods: {},
  destroyed() {
    // 通过赋值null的方式，释放掉worker引用，这样就可以关闭worker，这是作者在github上说的
    this.worker = null
  }
}
</script>

<style scoped lang="less">
/deep/ .el-range-editor--small.el-input__inner {
  width: 216px;
}
</style>
