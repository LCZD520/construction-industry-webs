<template>
  <div id="app">
    <el-container v-if="this.$route.path === '/login'">
      <router-view/>
    </el-container>
    <Layout v-else/>
  </div>
</template>

<script>

import Layout from "./layout/Layouts";

export default {
  name: 'App',
  components: {Layout}
}
</script>

<style scoped lang="less">
/deep/ .el-range-editor--small.el-input__inner{
  width: 216px;
}
/deep/ .el-form-item__content .el-input__inner{
  width: 216px;
}
</style>
