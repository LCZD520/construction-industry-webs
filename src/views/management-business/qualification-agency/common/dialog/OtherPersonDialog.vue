/**
* Created by Lv Cheng on 2022/7/16
* Notes 工程师/三类人员/技术工种-添加/编辑对话框
*/
<template>
  <el-dialog
      width="60%"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      :title="'资质代办所需人员（'+dialogTitle+'）'"
      :visible.sync="visible">
    <el-form
        size="small" ref="form" :rules="rules"
        :model="personInfo" label-position="right" label-width="120px">
      <el-form-item label="级别专业-初始" prop="levelMajorInitialConversionValidator">
        <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">
            添加
          </el-button>
        </div>
        <el-table
            size="mini"
            :data="personInfo.levelMajorInitialConversion"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="200"
              label="级别专业">
            <template slot-scope="scope">
              {{ scope.row.levelMajor[0] }}&nbsp;-&nbsp;{{ scope.row.levelMajor[1] }}
            </template>
          </el-table-column>
          <el-table-column
              min-width="200"
              label="初始转注">
            <template slot-scope="scope">
              {{ $valueToLabel(scope.row.initialConversion, $store.state.initial_conversion_options) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="primary"
                  @click.stop="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="danger"
                  @click.stop="handleDelete(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="需求人数" prop="demandNumber">
        <el-input-number class="width-full" :min="0" controls-position="right" v-model="personInfo.demandNumber">
        </el-input-number>
      </el-form-item>
      <el-form-item label="企业出价" prop="talentPrice">
        <el-input-number controls-position="right" :min="0" v-model="personInfo.talentPrice"/>
        元
        <el-input-number
            ref="talentPriceNumber"
            controls-position="right" :min="1"
            v-model="personInfo.talentPriceNumber"/>
        &nbsp;
        <el-select ref="numberUnit" v-model="personInfo.numberUnit" style="width: 100px;" placeholder="请选择">
          <el-option
              v-for="item in this.$store.state.number_unit_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="personInfo.remark" placeholder="请输入备注..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
    </el-form>
    <el-dialog
        :close-on-click-modal="false"
        style="margin-top: 15vh"
        width="50%"
        title="添加级别专业-转注"
        :visible.sync="innerVisible"
        append-to-body>
      <el-form
          label-position="right"
          label-width="120px"
          ref="innerForm"
          :rules="innerRules"
          :model="levelMajorInitial">
        <el-form-item label="级别专业" prop="levelMajor">
          <el-cascader
              class="width-full"
              clearable
              :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,children:'listCertificateCategory'}"
              placeholder="请选择级别专业"
              :options="this.$store.state.list_certificate_category"
              v-model="levelMajorInitial.levelMajor">
          </el-cascader>
        </el-form-item>
        <el-form-item label="初始转注" prop="initialConversion">
          <el-select
              class="width-full"
              v-model="levelMajorInitial.initialConversion"
              placeholder="请选择初始转注">
            <el-option
                v-for="item in this.$store.state.initial_conversion_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerCancel">取 消</el-button>
        <el-button type="primary" @click="innerConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="beforeClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'OtherPersonDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    personInfo: {
      type: Object,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
  },
  data() {
    const levelMajorInitialConversionValidator = (rule, value, callback) => {
      if (this.personInfo.levelMajorInitialConversion.length === 0) {
        callback(new Error('请选择证书!'))
      }
      callback()
    }
    const talentPriceValidator = (rule, value, callback) => {
      if (this.personInfo.talentPrice === undefined
          || this.personInfo.talentPrice === null) {
        callback(new Error('企业出价不能为空!'))
      }
      if (this.personInfo.talentPriceNumber === undefined
          || this.personInfo.talentPriceNumber === null
          || this.personInfo.numberUnit === undefined
          || this.personInfo.numberUnit === null) {
        callback(new Error('请输入完整内容!'))
      }
      callback()
    }
    return {
      innerVisible: false,
      innerMode: '',
      currentIndex: null,
      rules: {
        levelMajorInitialConversionValidator: [
          {required: true, validator: levelMajorInitialConversionValidator, trigger: 'change'}
        ],
        demandNumber: [
          {required: true, message: '请输入人数', trigger: 'blur'}
        ],
        talentPrice: [
          {required: true, validator: talentPriceValidator, trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      },
      levelMajorInitial: {
        levelMajor: [],
        initialConversion: null
      },
      innerRules: {
        levelMajor: [
          {required: true, message: '请选择级别-专业', trigger: 'change'}
        ],
        initialConversion: [
          {required: true, message: '请选择初始转注', trigger: 'change'}
        ],
      }
    }
  },
  methods: {
    handleAdd() {
      this.innerMode = 'add'
      this.innerVisible = true
      this.$nextTick(() => {
        this.$refs.innerForm.resetFields()
      })

    },
    handleEdit(_index, _row) {
      this.currentIndex = _index
      this.innerMode = 'edit'
      this.levelMajorInitial = JSON.parse(JSON.stringify(_row))
      this.innerVisible = true
    },
    handleDelete(_index) {
      console.log(_index)
      this.personInfo.levelMajorInitialConversion.splice(_index)
    },
    innerCancel() {
      this.$refs.innerForm.resetFields()
      this.innerVisible = false
    },
    innerConfirm() {
      this.$refs.innerForm.validate(valid => {
        if (valid) {
          this.innerVisible = false
          if (this.innerMode === 'add') {
            this.personInfo.levelMajorInitialConversion.push(
                JSON.parse(JSON.stringify(this.levelMajorInitial))
            )
            return
          }
          setTimeout(() => {
            this.$nextTick(() => {
              this.$set(this.personInfo.levelMajorInitialConversion
                  , this.currentIndex
                  , JSON.parse(JSON.stringify(this.levelMajorInitial)))
            })
          }, 0)
          return
        }
        this.$message.error('输入有误')
      })
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('confirm')
          this.$emit('closeDialog')

          return
        }
        this.$message.error('输入有误!')
      })
    },
    beforeClose() {
      this.$refs.form.resetFields()
      this.$emit('closeDialog')
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            that.$refs.cascaderLevelMajor.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea.dropDownVisible = false
                  return
                }
                that.$refs.cascaderLevelMajor.dropDownVisible = false
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">

</style>
