/**
* Created by Lv Cheng on 2022/6/9
* Notes 审批管理
*/
<template>
  <div class="management-approval">
    <div class="box">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card style="background: #ffdf25;cursor: pointer" shadow="hover">
            <p>入账管理审核配置</p>
            <p>1次审核</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background: #36a9ce;cursor: pointer" shadow="hover">
            <p>转账管理审核配置</p>
            <p>1次审核</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background: #ef5aa1;cursor: pointer" shadow="hover">
            <p>业绩管理审核配置</p>
            <p>1次审核</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagementApproval',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.management-approval {
  .box {
    width: 780px;
    margin: 90px auto;

    p {
      font: bold 18px/3 "Microsoft Yahei";
      color: #fff;
      text-align: center;
    }

    /deep/ .el-card__body {
      //min-width: 200px;
      border-radius: 5px;
    }

    /deep/ .el-card__body:hover {
      transform: scale(1.1);
      transition: .2s;
    }
  }

}
</style>
