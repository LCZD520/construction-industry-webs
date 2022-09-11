/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才资源汇总编辑
*/
<template>
  <div class="summary-talent-resources-add">
    <TalentResourcesAddEdit talent-resource-mode="edit"/>
  </div>
</template>

<script>
import TalentResourcesAddEdit from "../common-talent-resources/TalentResourcesAddEdit";

export default {
  name: 'SummaryTalentResourcesEdit',
  components: {TalentResourcesAddEdit},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
