
/**
* Created by Lv Cheng on 2022/6/20
* Notes 我的企业资源编辑
*/
<template>
  <div class="my-enterprise-resources-edit">
    <EnterpriseResourcesAddEdit resource-mode="edit"/>
  </div>
</template>

<script>
import EnterpriseResourcesAddEdit from "../common-enterprise-resources/EnterpriseResourcesAddEdit";
export default {
  name: 'MyEnterpriseResourcesEdit',
  components: {EnterpriseResourcesAddEdit},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
