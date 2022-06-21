/**
* Created by Lv Cheng on 2022/6/20
* Notes 职称评审入账查看
*/
<template>
  <div class="entry-title-evaluation-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方信息">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="转账方式">
            <el-select disabled class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司账户">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到账日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-select disabled class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">历史记录</el-divider>
      <p>
        职称评审入账记录
        <span style="color:#409EFF;display:inline-block;margin-left: 20px">
          已通过:55000 待申请:0
        </span>
      </p>
      <br>
      <el-table
          size="mini"
          :data="tableData"
          stripe
          border
          highlight-current-row
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            min-width="200"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <br>
      <el-divider content-position="left">职称评审图片</el-divider>
      <el-card>
        <div slot="header">
          <span>合同</span>
          <el-button icon="el-icon-download" style="float: right;" size="small" type="primary">下载图片</el-button>
        </div>
        <div v-if="true">
          <el-row :gutter="10">
            <el-col :span="4" v-for="(o) in 10" :key="o">
              <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px">
                <el-image
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
                </el-image>
                <div style="padding: 14px;">
                  <span>
                    <el-checkbox>
                      <option>111111</option>
                    </el-checkbox>
                  </span>
                  <div class="bottom clearfix">
                    <time class="time">2022-6-20</time>
                    <el-button icon="el-icon-download" type="primary" round class="button"/>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else style="padding: 0" description="暂无图片"/>
      </el-card>
      <el-card>
        <div slot="header">
          <span>证件</span>
          <el-button icon="el-icon-download" style="float: right;" size="small" type="primary">下载图片</el-button>
        </div>
        <div v-if="true">
          <el-row :gutter="10">
            <el-col :span="4" v-for="(o) in 10" :key="o">
              <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px">
                <el-image
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
                </el-image>
                <div style="padding: 14px;">
                  <span>
                    <el-checkbox>
                      <option>111111</option>
                    </el-checkbox>
                  </span>
                  <div class="bottom clearfix">
                    <time class="time">2022-6-20</time>
                    <el-button icon="el-icon-download" type="primary" round class="button"/>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else style="padding: 0" description="暂无图片"/>
      </el-card>
      <el-card>
        <div slot="header">
          <span>其他</span>
          <el-button icon="el-icon-download" style="float: right;" size="small" type="primary">下载图片</el-button>
        </div>
        <div v-if="true">
          <el-row :gutter="10">
            <el-col :span="4" v-for="(o) in 10" :key="o">
              <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px">
                <el-image
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
                </el-image>
                <div style="padding: 14px;">
                  <span>
                    <el-checkbox>
                      <option>111111</option>
                    </el-checkbox>
                  </span>
                  <div class="bottom clearfix">
                    <time class="time">2022-6-20</time>
                    <el-button icon="el-icon-download" type="primary" round class="button"/>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else style="padding: 0" description="暂无图片"/>
      </el-card>
      <br>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EntryTitleEvaluationView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '申请时间',
          key: 'address'
        },
        {
          title: '申请入账金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '入账方信息',
          key: 'address'
        },
        {
          title: '入账日期',
          key: 'address'
        },
        {
          title: '申请状态',
          key: 'address'
        },
      ],
      tableData: [{}]
    }
  },
  methods: {
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.entry-title-evaluation-view {
  margin: 0 100px;

  .width-full {
    width: 100%;
  }
}


.time {
  font-size: 14px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 4px;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
