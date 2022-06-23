/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质类别
*/
<template>
  <div class="qualification-category">
    <h3>资质类别</h3>
    <el-divider/>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 180px;"
                  placeholder="搜索"
                  @input="searchKeyword1"
                  v-model="keyword1">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <div style="float: right">
                <el-button size="small" plain @click="visible = true">新增</el-button>
              </div>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in 20" :key="item">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item+''" placement="top">
                    <span class="title">{{ item }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-plus"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-edit"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 180px;"
                  placeholder="搜索"
                  @input="searchKeyword2"
                  v-model="keyword2">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in 20" :key="item">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item+''" placement="top">
                    <span class="title">{{ item }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-plus"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-edit"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 180px;"
                  placeholder="搜索"
                  @input="searchKeyword3"
                  v-model="keyword3">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in 20" :key="item">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item+''" placement="top">
                    <span class="title">{{ item }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-plus"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-edit"
                               @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="list-item">
            <div class="list-item-header">
              <el-input
                  size="small"
                  style="width: 180px;"
                  placeholder="搜索"
                  @input="searchKeyword4"
                  v-model="keyword4">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in 20" :key="item">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item" placement="top">
                    <span class="title">{{ item }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" plain type="primary"
                               icon="el-icon-edit" @click.stop="visible2 = true"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="danger"
                               icon="el-icon-delete"></el-button>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
            <!--            <el-empty :image-size="200"></el-empty>-->
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
        :close-on-click-modal=false
        width="30%"
        title="资质类别"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-content">
        <el-form
            label-width="80px"
            label-position="right">
          <el-form-item label="上级类别">
            <el-select class="width-full" disabled size="small" v-model="form.pid">
              <el-option label="无" :value="null"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别名称">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number class="width-full" controls-position="right" v-model="form.name"
                             size="small"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button
            size="small"
            type="primary">提 交
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        :close-on-click-modal=false
        width="30%"
        title="资质类别"
        :visible.sync="visible2"
        :before-close="()=>this.visible2 = false">
      <div class="dialog-content">
        <el-form
            label-width="80px"
            label-position="right">
          <el-form-item label="上级类别">
            <el-select class="width-full" disabled size="small" v-model="form.pid">
              <el-option label="无" :value="null"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别名称">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number class="width-full" controls-position="right" v-model="form.name"
                             size="small"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="visible2 = false">取 消</el-button>
        <el-button
            size="small"
            type="primary">提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'QualificationCategory',
  components: {},
  data() {
    return {
      visible: false,
      visible2: false,
      form: {
        name: '',
        pid: null
      },
      keyword1: '',
      keyword2: '',
      keyword3: '',
      keyword4: '',
    }
  },
  methods: {
    searchKeyword1(_keyword) {
      console.log(_keyword)
    },
    searchKeyword2() {
    },
    searchKeyword3() {
    },
    searchKeyword4() {
    },
  }
}
</script>

<style scoped lang="less">
.el-divider--horizontal {
  margin: 12px 0;
}

.qualification-category {
  .container {
    margin: 50px 60px;

    .list-item {
      min-height: 480px;
      max-height: 480px;
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
