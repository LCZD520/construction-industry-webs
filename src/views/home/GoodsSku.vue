<template>
  <div class="goods-add">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'属性'"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
            required: true, message: '属性名不能为空', trigger: 'blur'
          }"
      >
        <el-input placeholder="请输入属性名" style="width: 150px;margin-right: 10px" v-model="domain.value"></el-input>
        <el-tag
          :key="tag"
          v-for="tag in domain.dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" plain icon="el-icon-plus" @click="showInput(domain)">添加</el-button>
        <el-button style="margin-left: 10px" type="danger" plain icon="el-icon-delete"
                   @click.prevent="removeDomain(domain)"
        >删除
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增属性</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'GoodsSku',
  components: {},
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      dynamicValidateForm: {
        domains: [{
          key: '',
          value: '',
          dynamicTags: ['标签一', '标签二']
        }]
      }
    }
  },
  computed: {},
  created() {
  },
  mounted() {

  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput(domain) {
      console.log(domain,"domain")
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
        // console.log(this.$refs.saveTagInput[0])
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
