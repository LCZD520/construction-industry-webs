/**
* Created by Lv Cheng on 2022/6/19
* Notes 编辑企业
*/
<template>
  <div class="enterprise-edit">
    <EnterpriseAdd enterprise-mode="edit"/>
  </div>
</template>

<script>
import EnterpriseAdd from "./EnterpriseAdd";

export default {
  name: 'EnterpriseEdit',
  components: {EnterpriseAdd},
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
