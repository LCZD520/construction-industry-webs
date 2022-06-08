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

<style scoped>

</style>
