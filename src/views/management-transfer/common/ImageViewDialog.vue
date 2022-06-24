/**
* Created by Lv Cheng on 2022/6/24
* Notes 图片查看
*/
<template>
  <div class="image-view-dialog">
    <el-dialog
        style="margin-top: 15vh"
        width="60%"
        title="图片"
        :visible.sync="visible"
        :before-close="()=>$emit('closeDialog')"
        append-to-body>
      <el-button size="small" type="primary">下载图片</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageViewDialog',
  components: {},
  data() {
    return {}
  },
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
