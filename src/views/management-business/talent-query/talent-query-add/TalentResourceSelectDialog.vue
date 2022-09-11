/**
* Created by Lv Cheng on 2022/6/23
* Notes 从人才资源选择/从已录人才资源选择弹窗
*/
<template>
  <div class="talent-resource-select-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="80%"
        :title="dialogTitle"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="formData"
              inline
              label-width="120px"
              :model="form">
            <el-form-item label="姓名">
              <el-input size="small" v-model="form.name" placeholder="请输入姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-cascader
                  size="small"
                  clearable
                  ref="cascader"
                  @expand-change="cascaderClick"
                  @visible-change="cascaderClick"
                  :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                  placeholder="请选择地区"
                  :options="this.$provinceAndCityData"
                  @change="handleChange"
                  v-model="form.area">
              </el-cascader>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input size="small" v-model="form.name" placeholder="请输入姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="级别专业">
              <el-cascader
                  size="small"
                  clearable
                  ref="cascader"
                  @expand-change="cascaderClick"
                  @visible-change="cascaderClick"
                  :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                  placeholder="请选择级别专业"
                  :options="this.$provinceAndCityData"
                  @change="handleChange"
                  v-model="form.area">
              </el-cascader>
            </el-form-item>
            <el-form-item label="初始转注">
              <el-select size="small" v-model="form.name" placeholder="请选择初始转注">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" ">
              <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
              <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
            </el-form-item>
          </el-form>
          <el-table
              height="260"
              ref="table"
              size="mini"
              :data="talentList"
              highlight-current-row
              border
              @row-click="handleRowClick"
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
            <el-table-column width="50" label="#" style="text-align: center">
              <template #default="{$index,row}">
                <el-radio @click.native.prevent="handleRadioClick(row)" v-model="currentIndex" :label="$index">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column
                prop="fullName"
                label="姓名">
            </el-table-column>
            <el-table-column
                label="地区">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.area === null">未填</el-tag>
                <span v-else> {{ $CodeToText[scope.row.area] }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="社保">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.socialSecurity === null">未填</el-tag>
                <span> {{
                    scope.row.socialSecurity === '000000' ? '无'
                        : $CodeToText[scope.row.socialSecurity]
                  }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="telephoneNumber"
                label="电话号码">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.telephoneNumber === null">未填
                </el-tag>
                <span v-else>{{ scope.row.telephoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="职称">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.title === null">未填</el-tag>
                <span v-else> {{ $valueToLabel(scope.row.title, $store.state.title_options) }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="三类人员">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.classThreePersonnel === null">未填
                </el-tag>
                <span v-else> {{
                    $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options)
                  }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="招标出场">
              <template slot-scope="scope">
                <el-tag disable-transitions type="info" size="mini" v-if="scope.row.tenderExit === null">未填</el-tag>
                <span v-else> {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}</span>
              </template>
            </el-table-column>
            <el-table-column
                min-width="260"
                label="级别-专业-初/转">
              <template slot-scope="scope">
                <el-tag size="mini" disable-transitions v-if="scope.row.listCertificates.length === 0" type="info">暂无证书
                </el-tag>
                <span v-else style="white-space:pre-line;">
            <span v-for="item in scope.row.listCertificates" :key="item.id">
              {{ item.levelMajor[0] }}/{{ item.levelMajor[1] }}
              &nbsp;-&nbsp;
              <el-tag size="mini" disable-transitions v-if="item.initialConversion === null" type="info">无</el-tag>
              <span v-else>
                {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) + "\n" }}
              </span>
            </span>
          </span>
              </template>
            </el-table-column>
            <el-table-column
                min-width="160"
                label="报价">
              <template slot-scope="scope">
                <el-tag type="info" size="mini" v-if="scope.row.talentPrice === null">未填</el-tag>
                <span v-else> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                  {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                  {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div class="pagination-total">共<span class="total"> {{ pageInfo.total }} </span>条</div>
            <div class="pagination-right">
              <el-pagination
                  ref="pagination"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="pageInfo.pageSize"
                  :current-page.sync="pageInfo.currentPage"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  background
                  layout="sizes, prev, pager, next, jumper"
                  :total="pageInfo.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            @click="handleConfirm">确 认
        </el-button>
        <el-button size="small" @click="beforeClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'TalentResourceSelectDialog',
  components: {},
  data() {
    return {
      currentIndex: null,
      currentSelectId: null,
      form: {
        name: '',
        area: ''
      },
      options: [
      ],
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    talentList: {
      type: Array,
      default: () => []
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    pageInfo: {
      type: Object
    }
  },
  methods: {
    /**
     * 取消选中
     */
    cancelSelect() {
      this.currentIndex = null
      this.$refs.table.setCurrentRow()
      this.currentSelectId = null
    },

    /**
     * 单选按钮点击
     * @param _row
     */
    handleRadioClick(_row) {
      this.currentSelectId ?
          this.currentSelectId = null : this.currentSelectId = _row.id
    },
    /**
     * 表格行点击
     * @param _row
     */
    handleRowClick(_row) {
      if (this.currentIndex === this.talentList.indexOf(_row)) {
        this.cancelSelect()
        return
      }
      this.currentIndex = this.talentList.indexOf(_row)
      this.currentSelectId = _row.id
    },
    /**
     * 确认
     */
    handleConfirm() {
      if (this.currentSelectId) {
        this.$emit('confirm', this.currentIndex)
        this.$emit('closeDialog')
        this.cancelSelect()
        return
      }
      this.$message.warning('至少选择一条记录')
    },
    /**
     * 关闭弹窗
     */
    beforeClose() {
      this.cancelSelect()
      this.$emit('closeDialog')
    },
    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
              }
            })
      }, 1)
    },
    handleChange(_val) {
      console.log(_val)
      console.log(this.form)
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.$emit('handleCurrentChange')
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.$emit('handleSizeChange', _pageSize)
    }
  },
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-table-pagination";
@import "../../../../assets/css/common-el-input-inner-width";

/deep/ .el-radio__label {
  padding: 0 !important;
}

</style>
