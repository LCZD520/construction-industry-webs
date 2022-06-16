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
                <el-button size="small" plain>新增</el-button>
              </div>
            </div>
            <el-scrollbar style="height: 450px">
              <ul class="list-item-content">
                <li v-for="item in 100" :key="item">
                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item+''" placement="top">
                    <span class="title">{{ item }} </span>
                  </el-tooltip>
                  <div class="button-group">
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-plus"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-edit"></el-button>
                    <el-button style="padding: 5px" size="mini" plain type="danger" icon="el-icon-delete"></el-button>
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
                  @input="searchKeyword4"
                  v-model="keyword4">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <!--            <el-scrollbar style="height: 450px">-->
            <!--              <ul class="list-item-content">-->
            <!--                <li v-for="item in 100" :key="item">-->
            <!--                  <el-tooltip class="item" :open-delay="300" effect="dark" :content="item" placement="top">-->
            <!--                    <span class="title">{{ item }} </span>-->
            <!--                  </el-tooltip>-->
            <!--                  <div class="button-group">-->
            <!--                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-plus"></el-button>-->
            <!--                    <el-button style="padding: 5px" size="mini" plain type="primary" icon="el-icon-edit"></el-button>-->
            <!--                    <el-button style="padding: 5px" size="mini" plain type="danger" icon="el-icon-delete"></el-button>-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </el-scrollbar>-->
            <el-empty :image-size="220"></el-empty>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificateCategory',
  components: {},
  data() {
    return {
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

.certificate-category {
  .container {
    margin: 50px 280px;

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
