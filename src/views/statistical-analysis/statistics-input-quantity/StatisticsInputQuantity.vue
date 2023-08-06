/**
* Created by Lv Cheng on 2022/6/9
* Notes 录入量统计
*/
<template>
  <div class="statistics-input-quantity">
    <el-form
        ref="form"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="日期" prop="date">
        <el-date-picker
            v-model="form.date"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="$pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=" " label-width="0">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size="small" :plain="radio !== 1" @click="radio = 1" type="primary" icon="el-icon-s-grid">表格
          </el-button>
          <!--          <el-button size="small" :plain="radio !== 2" @click="radio = 2" type="primary" icon="el-icon-pie-chart">饼状图-->
          <!--          </el-button>-->
          <el-button size="small" :plain="radio !== 3" @click="radio = 3" type="primary"
                     icon="el-icon-s-data">柱形图
          </el-button>
          <el-button size="small" :plain="radio !== 4" @click="radio = 4" type="primary" icon="el-icon-s-marketing">折线图
          </el-button>
        </el-button-group>
      </el-form-item>
      <!--      <el-form-item label=" ">-->
      <!--        <el-select size="small" v-model="value" placeholder="请选择">-->
      <!--          <el-option-->
      <!--              v-for="item in options"-->
      <!--              :key="item.value"-->
      <!--              :label="item.label"-->
      <!--              :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <div v-show="radio === 1">
      <el-table
          size="mini"
          show-summary
          tooltip-effect="dark"
          :summary-method="getSummaries"
          :data="list"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="180"
            fixed
            prop="fullName"
            label="用户">
        </el-table-column>
        <el-table-column
            min-width="180"
            show-overflow-tooltip
            prop="fullName"
            label="角色">
          <template #default="{row}">
            <el-tag
                v-if="row.listRoleIds && row.listRoleIds.length>0"
                size="small"
                style="margin: 3px"
                v-for="item in row.listRoleIds"
                :key="item"
                type="primary"
                effect="dark">
              &nbsp;&nbsp;{{ $store.state.roleList.find(i => i.roleId === item).roleName }}&nbsp;&nbsp;
            </el-tag>
            <el-tag
                v-else
                size="small"
                style="margin-right: 10px"
                type="info"
                effect="dark">
              暂无角色
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            min-width="200"
            sortable
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
    </div>
    <div id="pie-chart" style="width: 100%;height: 80vh" v-show="radio === 2">
    </div>
    <div id="pie-chart3" style="width: 100%;height: 80vh" v-show="radio === 3">
    </div>
    <div id="pie-chart2" style="width: 100%;height: 80vh" v-show="radio === 4">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsInputQuantity',
  components: {},
  data() {
    return {
      value: null,
      radio: 1,
      nameList: [
        '赵', '路', '娄', '危'
      ],
      columns: [
        {
          title: '所属分公司/部门/分组',
          key: 'mechanismName'
        },
        {
          title: '录入人才数',
          key: 'totalTalent'
        },
        {
          title: '录入企业数',
          key: 'totalEnterprise'
        },
        {
          title: '资质收购录入数',
          key: 'totalQualificationAcquisition'
        },
        {
          title: '资质转让录入数',
          key: 'totalQualificationTransfer'
        },
        {
          title: '资质代办录入数',
          key: 'totalQualificationAgency'
        },
        {
          title: '职称评审录入数',
          key: 'totalTitleEvaluation'
        },
        {
          title: '三类人员录入数',
          key: 'totalClassThreePerson'
        },
        {
          title: '学历提升录入数',
          key: 'totalEducationPromotion'
        },
      ],
      legendData: [],
      seriesData: [],
      options: [
        {
          value: 1,
          label: '录入企业数'
        },
        {
          value: 2,
          label: '录入人才数'
        },
        {
          value: 3,
          label: '资质收购录入数'
        },
        {
          value: 4,
          label: '资质转让录入数'
        },
        {
          value: 5,
          label: '资质代办录入数'
        },
        {
          value: 6,
          label: '职称评审录入数'
        },
        {
          value: 7,
          label: '三类人员录入数'
        },
        {
          value: 8,
          label: '学历提升录入数'
        },
        {
          value: 9,
          label: '录入总数'
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        date: []
      },
    }
  },
  created() {
    this.search()
  },
  mounted() {

  },
  methods: {
    reset() {
      this.form.date = null
    },
    @throttle()
    async search() {
      let newForm = {}
      if (this.form.date && this.form.date.length > 0) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      try {
        const res = await this.$http.post('/input-quantity-statistics/list', newForm)
        console.log(res)
        this.list = res.data
        this.legendData = this.list.map(item => item.fullName)
        this.pageInfo.total = res.data.length
      } catch (e) {
        console.log(e)
      }
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    makeWord(max, min) {
      const nameLen = Math.ceil(Math.random() * max + min);
      const name = [];
      for (let i = 0; i < nameLen; i++) {
        name.push(this.nameList[Math.round(Math.random() * this.nameList.length - 1)]);
      }
      return name.join('');
    },
    renderPieChart() {
      this.seriesData = this.legendData.map(item => {
        return {
          name: item,
          value: 5
        }
      })
      let option = {
        title: {
          text: '饼状图展示',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.legendData
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: this.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.$nextTick(() => {
        let chartDom = document.getElementById('pie-chart');
        let myChart = this.$echarts.init(chartDom);
        option && myChart.setOption(option);
      })
    },
    renderPieChart2() {
      this.seriesData = this.legendData.map(item => {
        return {
          name: item,
          value: 5
        }
      })
      const legend = ['人才', '企业', '资质收购', '资质转让', '资质代办', '职称评审', '三类人员', '学历提升']
      const legendKey = ['totalTalent', 'totalEnterprise', 'totalQualificationAcquisition', 'totalQualificationTransfer'
        , 'totalQualificationAgency', 'totalTitleEvaluation', 'totalClassThreePerson', 'totalEducationPromotion']
      const series = legend.map((item, index) => {
        return {
          name: item,
          type: 'line',
          stack: 'Total',
          data: this.list.map(i => i[legendKey[index]])
        }
      })
      let option = {
        title: {
          text: '折线图展示'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['人才', '企业', '资质收购', '资质转让', '资质代办', '职称评审', '三类人员', '学历提升']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.legendData
        },
        yAxis: {
          type: 'value'
        },
        series
      }
      this.$nextTick(() => {
        let chartDom = document.getElementById('pie-chart2');
        let myChart = this.$echarts.init(chartDom);
        option && myChart.setOption(option);
      })
    },
    renderPieChart3() {
      console.log(this.list)
      const legend = ['人才', '企业', '资质收购', '资质转让', '资质代办', '职称评审', '三类人员', '学历提升']
      const legendKey = ['totalTalent', 'totalEnterprise', 'totalQualificationAcquisition', 'totalQualificationTransfer'
        , 'totalQualificationAgency', 'totalTitleEvaluation', 'totalClassThreePerson', 'totalEducationPromotion']
      const series = legend.map((item, index) => {
        return {
          name: item,
          type: 'bar',
          data: this.list.map(i => i[legendKey[index]])
        }
      })
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true, title: '数据试图'},
            dataView: {show: true, readOnly: true, title: '数据试图'},
            magicType: {
              show: true, type: ['line', 'bar'], title: {
                line: '切换为折线图',
                bar: '切换为柱状图',
              }
            },
            restore: {show: true, title: '还原'},
            saveAsImage: {show: true, title: '保存为图片'}
          }
        },
        calculable: true,
        legend: {
          data: legend,
          itemGap: 5
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.legendData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '录入数',
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series
      };
      this.$nextTick(() => {
        let chartDom = document.getElementById('pie-chart3');
        let myChart = this.$echarts.init(chartDom);
        option && myChart.setOption(option);
      })
    },
  },
  watch: {
    radio(newVal) {
      // newVal === 2 && this.renderPieChart()
      newVal === 3 && this.renderPieChart3()
      newVal === 4 && this.renderPieChart2()
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";

/deep/ .el-table__footer-wrapper tbody td.el-table__cell, .el-table__header-wrapper tbody td.el-table__cell {
  text-align: center;
}

/deep/ .el-table__fixed-footer-wrapper tbody td.el-table__cell {
  text-align: center;
}
</style>
