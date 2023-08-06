/**
* Created by Lv Cheng on 2022/6/9
* Notes 审批管理
*/
<template>
  <div class="management-approval">
    <div class="box">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card style="background: #ffdf25;cursor: pointer" shadow="hover" @click.native="visible = true">
            <p>入账管理审核配置</p>
            <p>{{ this.entryList.length }}次审核</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background: #36a9ce;cursor: pointer" shadow="hover" @click.native="visible2 = true">
            <p>转账管理审核配置</p>
            <p>{{ this.transferList.length }}次审核</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background: #ef5aa1;cursor: pointer" shadow="hover" @click.native="visible3 = true">
            <p>业绩管理审核配置</p>
            <p>{{ this.achievementList.length }}次审核</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
        :close-on-click-modal=false
        width="60%"
        title="入账管理审核配置"
        :visible.sync="visible"
        :before-close="beforeClose(visible)">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <span>审核角色及顺序</span>
          <el-button
              @click="handleAdd('entryList')"
              style="margin-left: 20px" type="primary" size="small" icon="el-icon-plus">
            添加
          </el-button>
          <br><br>
          <el-steps direction="vertical" :active="entryList.length" align-center>
            <el-step
                v-for="(item,index) in entryList"
                style="line-height: 28px;"
                :key="index"
                icon="el-icon-s-help">
              <div slot="title">
                <el-row :gutter="20">
                  <el-col :span="22">
                    <el-select class="width-full" size="small" v-model="item.roleId">
                      <el-option
                          v-for="item in $store.state.roleList"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                        @click="handleDelete(index,'entryList')"
                        size="mini" type="danger" icon="el-icon-delete"/>
                  </el-col>
                </el-row>
              </div>
              <div slot="description" style="height: 30px"></div>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            disabled
            @click="handleSave('entryList')">保 存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        :close-on-click-modal=false
        width="60%"
        title="转账管理审核配置"
        :visible.sync="visible2"
        :before-close="beforeClose(visible2)">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <span>审核角色及顺序</span>
          <el-button
              @click="handleAdd('transferList')"
              style="margin-left: 20px" type="primary" size="small" icon="el-icon-plus">
            添加
          </el-button>
          <br><br>
          <el-steps direction="vertical" :active="transferList.length" align-center>
            <el-step
                v-for="(item,index) in transferList"
                style="line-height: 28px;"
                :key="index"
                icon="el-icon-s-help">
              <div slot="title">
                <el-row :gutter="20">
                  <el-col :span="22">
                    <el-select class="width-full" size="small" v-model="item.roleId">
                      <el-option
                          v-for="item in options"
                          :disabled="item.disabled"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                        @click="handleDelete(index,'transferList')"
                        size="mini" type="danger" icon="el-icon-delete"/>
                  </el-col>
                </el-row>
              </div>
              <div slot="description" style="height: 30px"></div>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            disabled
            @click="handleSave('transferList')">保 存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        :close-on-click-modal=false
        width="60%"
        title="业绩管理审核配置"
        :visible.sync="visible3"
        :before-close="beforeClose(visible3)">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <span>审核角色及顺序</span>
          <el-button
              @click="handleAdd('achievementList')"
              style="margin-left: 20px" type="primary" size="small" icon="el-icon-plus">
            添加
          </el-button>
          <br><br>
          <el-steps direction="vertical" :active="achievementList.length" align-center>
            <el-step
                v-for="(item,index) in achievementList"
                style="line-height: 28px;"
                :key="index"
                icon="el-icon-s-help">
              <div slot="title">
                <el-row :gutter="20">
                  <el-col :span="22">
                    <el-select class="width-full" size="small" v-model="item.roleId">
                      <el-option
                          v-for="item in $store.state.roleList"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                        @click="handleDelete(index,'achievementList')"
                        size="mini" type="danger" icon="el-icon-delete"/>
                  </el-col>
                </el-row>
              </div>
              <div slot="description" style="height: 30px"></div>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            disabled
            @click="handleSave('achievementList')">保 存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ManagementApproval',
  components: {},
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      entryList: [],
      transferList: [],
      achievementList: [],
    }
  },
  computed: {
    options() {
      let list = JSON.parse(JSON.stringify(this.$store.state.roleList))
      list.forEach(item => item.disabled = false)
      return list.filter(item => {
        return !this.transferList.some(ele => {
          if (item.roleId === ele.roleId) {
            item.disabled = true
          }
        })
      })
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        try {
          const res = await this.$http.get('/approval-setting/list')
          if (res.status) {
            const {entryList, transferList, achievementList} = res.data
            this.entryList = entryList
            this.transferList = transferList
            this.achievementList = achievementList
          }
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // eslint-disable-next-line no-unused-vars
    beforeClose(_visible) {
      _visible = false
    },
    handleAdd(_list) {
      if (_list === 'entryList') {
        if (this.entryList.length > 0) {
          this.$message.warning(' 业绩/入账审批节点只能为0或1个')
          return
        }
        this.entryList.push(JSON.parse(JSON.stringify({
          roleId: null,
        })))
        return
      }
      if (_list === 'transferList') {
        if (this.transferList.length > 4) {
          this.$message.warning(' 转账审批节点不能超过5个')
          return
        }
        this.transferList.push({
          roleId: null,
        })
        return
      }
      if (_list === 'achievementList') {
        if (this.achievementList.length > 0) {
          this.$message.warning(' 业绩/入账审批节点只能为0或1个')
          return
        }
        this.achievementList.push({
          roleId: null,
        })
      }
    },
    handleDelete(_index, _list) {
      if (_list === 'entryList') {
        this.entryList.splice(_index, 1)

        return
      }
      if (_list === 'transferList') {
        this.transferList.splice(_index, 1)

        return
      }
      if (_list === 'achievementList') {
        this.achievementList.splice(_index, 1)

      }
    },
    async handleSave(_list) {
      if (_list === 'entryList') {
        let isEmpty = false
        this.entryList.forEach(item => !item.roleId && (isEmpty = true))
        if (isEmpty) {
          this.$message.error("入账审批节点选项不能为空")
          return
        }
        if (this.entryList.length === 0) {
          this.$message.warning("请添加入账审批节点")
          return
        }
        try {
          let res = await this.$http.put(`/approval-setting/save/${1}`, this.entryList)
          if (res) {
            this.$message.success(res.message)
            this.visible = false
            return
          }
          this.$message.error(res.message)
        } catch (e) {
          console.log(e)
        }
        return
      }
      if (_list === 'transferList') {
        let isEmpty = false
        this.transferList.forEach(item => !item.roleId && (isEmpty = true))
        if (isEmpty) {
          this.$message.error("转账审批节点选项不能为空")
          return
        }
        if (this.transferList.length === 0) {
          this.$message.warning("请添加转账审批节点")
          return
        }
        try {
          let res = await this.$http.put(`/approval-setting/save/${2}`, this.transferList)
          if (res) {
            this.$message.success(res.message)
            this.visible2 = false
            return
          }
          this.$message.error(res.message)
        } catch (e) {
          console.log(e)
        }
        return
      }
      if (_list === 'achievementList') {
        let isEmpty = false
        this.achievementList.forEach(item => !item.roleId && (isEmpty = true))
        if (isEmpty) {
          this.$message.error("业绩审批节点选项不能为空")
          return
        }
        if (this.achievementList.length === 0) {
          this.$message.warning("请添加业绩审批节点")
          return
        }
        try {
          let res = await this.$http.put(`/approval-setting/save/${3}`, this.achievementList)
          if (res) {
            this.visible3 = false
            this.$message.success(res.message)
            return
          }
          this.$message.error(res.message)
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
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
      border-radius: 5px;
    }

  }

  /deep/ .el-icon-s-help:before {
    vertical-align: sub;
  }
}
</style>
