/**
* Created by Lv Cheng on 2022/6/9
* Notes 证书类别
*/
<template>
  <div class="certificate-category">
    <h3>证书类别</h3>
    <el-divider/>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 220px;"
                  placeholder="搜索"
                  @input="searchKeyword1"
                  v-model="keyword1">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <div style="float: right">
                <el-button @click="handleAddEditCategory(0,'add')" size="small">新增</el-button>
              </div>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in list" :key="item.id" @click="searchSubCategory(item.id)">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item.categoryName" placement="top">
                    <span class="title">{{ item.categoryName }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button
                        style="padding: 5px" size="mini"
                        @click.stop="handleAddEditCategory(item.id,'add')" type="primary"
                        icon="el-icon-plus"></el-button>
                    <el-button
                        style="padding: 5px" size="mini" type="primary"
                        @click.stop="handleAddEditCategory(item.id)" icon="el-icon-edit"></el-button>
                    <el-button style="padding: 5px" size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 220px;"
                  placeholder="搜索"
                  @input="searchKeyword2"
                  v-model="keyword2">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <el-empty v-if="subList.length === 0" :image-size="220"></el-empty>
            <el-scrollbar v-else style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in subList" :key="item.id" @click="searchSubCategory(item.id)">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item.categoryName" placement="top">
                    <span class="title">{{ item.categoryName }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" type="primary" icon="el-icon-edit"></el-button>
                    <el-button style="padding: 5px" size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
        :close-on-click-modal=false
        width="30%"
        title="证书类别"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-content">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="80px"
            label-position="right">
          <el-form-item label="上级类别" prop="parentId">
            <el-cascader
                size="small"
                disabled
                ref="cascader"
                :props="{emitPath:false,value:'id',label:'categoryName',children:'listCertificateCategory'}"
                class="width-full"
                :options="options"
                v-model="form.parentId"/>
          </el-form-item>
          <el-form-item label="类别名称" prop="categoryName">
            <el-input v-model.trim="form.categoryName" size="small"/>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
                :min="0"
                class="width-full" controls-position="right" v-model="form.sort"
                size="small">
            </el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="beforeClose">取 消</el-button>
        <el-button
            @click="handleSubmit"
            size="small"
            type="primary">提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CertificateCategory',
  components: {},
  data() {
    return {
      mode: '',
      list: [],
      subList: [],
      form: {
        id: null,
        parentId: null,
        categoryName: '',
        sort: undefined,
      },
      rules: {
        parentId: [
          {required: false}
        ],
        categoryName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'}
        ],
      },
      keyword1: '',
      keyword2: '',
      visible: false,
      options: [
        {
          id: 0,
          categoryName: '无'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await this.$http.get('/certificate-category/list-tree')
        if (res.status && res.data !== null) {
          this.list = res.data
          await this.$store.dispatch('initListCertificateCategory', res.data)
          this.options = this.options.concat(res.data)
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.mode === 'add') {
            delete this.form.id
            try {
              const res = await this.$http.post('/certificate-category/insert', this.form)
              if (res.status) {
                this.$message.success(res.message)
                this.visible = false
                await this.getList()
                return
              }
              this.$message.error(res.message)
            } catch (e) {
              console.log(e)
            }
            return
          }


        }
        this.$message.error('输入有误')
      })
    },
    searchKeyword1(_keyword) {
      console.log(_keyword)
    },
    searchKeyword2() {
    },
    beforeClose() {
      this.visible = false
    },
    searchSubCategory(_id) {
      this.list.map(item => {
        if (_id === item.id) {
          this.subList = item.listCertificateCategory
        }
      })
    },
    handleAddEditCategory(_id, _mode) {
      this.mode = _mode
      this.visible = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.cascader.inputValue
              = this.options.find(item => item.id === _id).categoryName
        }, 0)
        this.form.parentId = _id
      })
      if (_mode === 'add') {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.parentId = _id
        })
        return
      }
      this.getDetailById(_id)
    },
    async getDetailById(_id) {
      try {
        const res = await this.$http.get('/certificate-category/detail/' + _id)
        if (res.status && res.data !== null) {
          for (let dataKey in res.data) {
            for (let formKey in this.form) {
              if (dataKey === formKey) {
                this.form[formKey] = res.data[dataKey]
              }
            }
          }
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.cascader.inputValue
                  = this.options.find(item => item.id === _id).categoryName
            }, 0)
          })
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-divider--horizontal {
  margin: 12px 0;
}

.certificate-category {
  .container {
    margin: 40px 280px;

    .list-item {
      height: 480px;
      padding: 15px;
      border: 1px solid #eee;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border-radius: 4px;

      .list-item-header {

      }

      .list-item-content {
        padding: 0 10px;
        margin-top: 10px;
        height: 450px;

        li {
          height: 40px;
          box-sizing: border-box;
          padding: 5px;

          .title {
            display: inline-block;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .button-group {
            float: right;
          }
        }

        li:hover {
          background: #eaf4fe;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
