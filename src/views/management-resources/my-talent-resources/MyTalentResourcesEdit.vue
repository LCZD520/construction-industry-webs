/**
* Created by Lv Cheng on 2022/6/20
* Notes 我的人才资源编辑
*/
<template>
  <div class="my-talent-resources-edit">
    <TalentResourcesAddEdit talent-resource-mode="edit"/>
  </div>
</template>

<script>
import TalentResourcesAddEdit from "../common-talent-resources/TalentResourcesAddEdit";

export default {
  name: 'MyTalentResourcesEdit',
  components: {TalentResourcesAddEdit},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
