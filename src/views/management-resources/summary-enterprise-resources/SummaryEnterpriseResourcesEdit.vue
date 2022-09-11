/**
* Created by Lv Cheng on 2022/6/20
* Notes 企业资源汇总编辑
*/
<template>
  <div class="summary-enterprise-resources-edit">
    <EnterpriseResourcesAddEdit resource-mode="edit"/>
  </div>
</template>

<script>
import EnterpriseResourcesAddEdit from "../common-enterprise-resources/EnterpriseResourcesAddEdit";
export default {
  name: 'SummaryEnterpriseResourcesEdit',
  components: {EnterpriseResourcesAddEdit},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
