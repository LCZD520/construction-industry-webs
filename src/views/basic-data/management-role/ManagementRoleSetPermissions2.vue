/**
* Created by Lv Cheng on 2022/6/21
* Notes 设置权限 Deprecated
*/
<template>
  <div class="management-role-set-permissions">

    <!--    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
    <br><br>
    <!--    <el-card class="box-card" v-for="(item,index) in listPermissions" :key="index">-->
    <!--      <div slot="header" class="clearfix">        &lt;!&ndash;            v-model="item.checked"&ndash;&gt;-->
    <!--        &lt;!&ndash;            :label="item.value" @change="handleChange(item.checked,index)">&ndash;&gt;-->
    <!--        &lt;!&ndash;                   &ndash;&gt;-->
    <!--        &lt;!&ndash;        </el-checkbox>&ndash;&gt;-->
    <!--        <el-checkbox-->
    <!--            :indeterminate="item.isIndeterminate"-->
    <!--            v-model="item.checked"-->
    <!--            @change="handleChange(item.checked, index)">-->
    <!--          {{ item.permissionName }}-->
    <!--        </el-checkbox>-->
    <!--      </div>-->
    <!--      <div v-for="(subItem,index) in item.subListPermissions" :key="index" class="content">-->
    <!--        <div class="content-left">-->
    <!--          <el-checkbox-group-->
    <!--              v-model="subItem.checkedList"-->
    <!--              @change="handleChange2(subItem.checkedList,index)">-->
    <!--            &lt;!&ndash;            <el-checkbox&ndash;&gt;-->
    <!--            &lt;!&ndash;                :label="subItem.permissionId">&ndash;&gt;-->
    <!--            &lt;!&ndash;              {{ subItem.permissionName }}&ndash;&gt;-->
    <!--            &lt;!&ndash;            </el-checkbox>&ndash;&gt;-->
    <!--            <el-checkbox-->
    <!--                v-for="(a, index) in item.subListPermissions"-->
    <!--                :label="a.permissionName"-->
    <!--                :key="index">{{ a.permissionName }}-->
    <!--            </el-checkbox>-->
    <!--          </el-checkbox-group>-->
    <!--        </div>-->
    <!--        <div class="content-right">-->
    <!--          &lt;!&ndash;          <el-row :gutter="10">&ndash;&gt;-->
    <!--          &lt;!&ndash;            <el-col v-for="subItem2 in subItem.subListPermissions" :key="subItem2.permissionId" :span="8">&ndash;&gt;-->
    <!--          &lt;!&ndash;              &lt;!&ndash;              v-model="subItem2.checked"&ndash;&gt;&ndash;&gt;-->
    <!--          &lt;!&ndash;              <el-checkbox-group v-model="selectedList">&ndash;&gt;-->
    <!--          &lt;!&ndash;                <el-checkbox&ndash;&gt;-->
    <!--          &lt;!&ndash;                    :indeterminate="subItem2.isIndeterminate"&ndash;&gt;-->
    <!--          &lt;!&ndash;                    v-model="subItem2.checked"&ndash;&gt;-->
    <!--          &lt;!&ndash;                    :label="subItem2.permissionId">{{ subItem2.permissionName }}&ndash;&gt;-->
    <!--          &lt;!&ndash;                </el-checkbox>&ndash;&gt;-->
    <!--          &lt;!&ndash;              </el-checkbox-group>&ndash;&gt;-->
    <!--          &lt;!&ndash;            </el-col>&ndash;&gt;-->
    <!--          &lt;!&ndash;          </el-row>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-card>-->
  </div>
</template>
<script>

export default {
  name: 'ManagementRoleSetPermissions',
  components: {},
  data() {
    return {
      checkAll: false,
      listPermissions: [],
      defaultProps: {
        children: 'subListPermissions',
        label: 'permissionName'
      }
    }
  },
  created() {
    this.getListPermissions()
  },
  mounted() {
  },
  methods: {
    // handleCheckAllChange(val) {
    // },
    handleChange(val, index) {
      let arr = []
      const re = this.listPermissions[index].subListPermissions;
      if (val) {
        for (let i = 0; i < re.length; i++) {
          arr[i] = re[i]["permissionName"];
        }
      }
      this.listPermissions[index].checkedList = arr

      console.log(this.listPermissions[index].checkedList)
      this.listPermissions[index].isIndeterminate = false

      console.log("+++++", this.listPermissions)
      this.$set(this.listPermissions, 'this.listPermissions', this.listPermissions)
    },
    handleChange2(val, index) {
      let checkedCount = val.length
      this.listPermissions[index].checked =
          checkedCount === this.listPermissions[index].subListPermissions.length
      this.listPermissions[index].isIndeterminate =
          checkedCount > 0 && checkedCount < this.listPermissions[index].subListPermissions.length
    },
    getListPermissions() {
      this.$http('/permission/get-list-permissions').then(res => {
        if (res.status) {
          if (res.data.listPermissions !== null) {
            this.listPermissions = res.data.listPermissions
            this.listPermissions.map(value => {
              value.isIndeterminate = false
              value.checked = false
              value.checkedList = []
              value.subListPermissions.map(value2 => {
                value2.isIndeterminate = false
                value2.checked = false
                value2.checkedList = []
                value2.subListPermissions.map(value3 => {
                  value3.checked = false
                })
              })
            })


            // this.listPermissions.forEach(i => {
            //   i.checked = false
            //   i.subListPermissions.forEach(j => {
            //     j.checked = false
            //     j.subListPermissions.forEach(k => {
            //       k.checked = false
            //     })
            //   })
            // })

            // console.log(this.listPermissions)
          }
        }
      })
    },

  },
  watch: {
    // checkAll(newValue, oldValue) {
    //   console.log(newValue, oldValue)
    //   // this.listPermissions.forEach(i => {
    //   //   i.checked = newValue;
    //   //   i.subListPermissions.forEach(j => {
    //   //     j.checked = newValue;
    //   //     j.subListPermissions.forEach(k => {
    //   //       k.checked = newValue;
    //   //     })
    //   //   })
    //   // })
    //   // let start = new Date().getTime()
    //   // let length = this.listPermissions.length
    //   // for (let i = 0; i < length; i++) {
    //   //   this.listPermissions[i].checked = newValue
    //   //   let length2 = this.listPermissions[i].subListPermissions.length
    //   //   for (let j = 0; j < length2; j++) {
    //   //     this.listPermissions[i]
    //   //         .subListPermissions[j]
    //   //         .checked = newValue
    //   //     let length3 = this.listPermissions[i].subListPermissions[j].subListPermissions.length
    //   //     for (let k = 0; k < length3; k++) {
    //   //       this.listPermissions[i]
    //   //           .subListPermissions[j]
    //   //           .subListPermissions[k]
    //   //           .checked = newValue
    //   //     }
    //   //   }
    //   // }
    //   // let end = new Date().getTime()
    //   // console.log(end - start)
    // },
    // selectedList(newValue) {
    //   console.log(newValue)
    // }
    // listPermissions(newValue) {
    //   console.log(newValue)
    // }
  }
}
</script>

<style scoped lang="less">
.management-role-set-permissions {
  padding: 10px;
}

.box-card {
  .content {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 10px;

    .content-left {
      flex: 1;
      padding-left: 10px;
    }

    .content-right {
      flex: 6;
      padding: 0 40px;
      border-left: 1px solid #ddd;
    }
  }

}

/deep/ .el-card__header {
  padding: 10px;
  background: #f0faff;
  border: 1px solid #abdcff;
}

/deep/ .el-card__body {
  padding: 0;
}
</style>
