/**
* Created by Lv Cheng on 2022/6/9
* Notes 证书统计
*/
<template>
  <div class="StatisticsCertificate">
    <el-form
        ref="form"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="级别专业" prop="levelMajor">
        <el-cascader
            size="small"
            clearable
            ref="cascaderLevelMajor"
            @expand-change="cascaderClick('levelMajor')"
            @visible-change="cascaderClick('levelMajor')"
            :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,checkStrictly:true
                    ,emitPath:false
                    ,children:'listCertificateCategory'}"
            placeholder="请选择级别专业"
            :options="this.$store.state.list_certificate_category"
            v-model="form.levelMajor">
        </el-cascader>
      </el-form-item>
      <el-form-item label="初始转注" prop="initialConversion">
        <el-select clearable size="small" v-model="form.initialConversion" placeholder="请选择初始转注">
          <el-option
              v-for="item in this.$store.state.initial_conversion_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" v-throttle="search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-button-group>-->
      <!--          <el-button size="small" plain type="primary" icon="el-icon-s-grid"></el-button>-->
      <!--          <el-button size="small" plain type="primary" icon="el-icon-pie-chart"></el-button>-->
      <!--          <el-button size="small" plain type="primary" icon="el-icon-s-data"></el-button>-->
      <!--        </el-button-group>-->
      <!--      </el-form-item>-->
    </el-form>
    <el-table
        :data="list"
        border
        :span-method="objectSpanMethod"
        height="600"
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          min-width="180"
          align="center"
          prop="level"
          label="级别">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          prop="major"
          label="专业">
      </el-table-column>
      <el-table-column
          label="初始转注"
          align="center"
          min-width="180">
        <template #default="{row}">
          {{ $valueToLabel(row.initialConversion, $store.state.initial_conversion_options) }}
        </template>
      </el-table-column>
      <el-table-column
          label="三类人员"
          align="center"
          min-width="180">
        <template #default="{row}">
          {{ $valueToLabel(row.classThreePersonnel, $store.state.class_three_personnel_options) }}
        </template>
      </el-table-column>
      <el-table-column
          label="数量"
          prop="count"
          align="right"
          min-width="180">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StatisticsCertificate',
  components: {},
  data() {
    return {
      list: [],
      searchList: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        levelMajor: '',
        initialConversion: null,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await this.$http.get('/talent-certificate/list')
        if (res && res.status) {
          console.log(res)
          let newList = res.data.map(item => {
            item.levelMajor = JSON.parse(item.levelMajor)
            return {
              level: item.levelMajor[0],
              major: item.levelMajor[1],
              initialConversion: item.initialConversion,
              classThreePersonnel: item.classThreePersonnel,
            }
          })
          console.log(newList, "newList")
          let list = []
          let set = new Set(newList.map(item => item.level))
          set.forEach(item => {
            list = list.concat(newList.filter(i => i.level === item))
          })
          console.log(set, "set")
          console.log(list, "list")
          let copyList = JSON.parse(JSON.stringify(list))
          for (let i = 0; i < copyList.length; i++) {
            copyList[i] = JSON.stringify(copyList[i])
          }
          let strList = new Set()
          newList.forEach(item => strList.add(JSON.stringify(item)))
          this.list = [...strList]
          for (let i = 0; i < this.list.length; i++) {
            this.list[i] = JSON.parse(this.list[i])
            this.list[i].count = copyList.filter(item => item === JSON.stringify(this.list[i])).length
          }
          this.list.sort((a, b) => {
            if (a.level < b.level) {
              return -1
            }
          })
          console.log(this.list, "this.list")
          this.searchList = JSON.parse(JSON.stringify(this.list))
        }
      } catch (e) {
        console.log(e)
      }
    },
    // eslint-disable-next-line no-unused-vars
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      let data = this.list; //拿到当前table中数据
      let cellValue = row[column.property]; //当前位置的值
      let noSortArr = ["count"]; //不需要合并的字段（不进行合并行的prop）
      if (cellValue && !noSortArr.includes(column.property)) {
        let prevRow = data[rowIndex - 1]; //获取到上一条数据
        let nextRow = data[rowIndex + 1]; //下一条数据
        if (prevRow && prevRow[column.property] === cellValue) { //当有上一条数据，并且和当前值相等时
          return {rowspan: 0, colspan: 0};
        } else {
          let countRowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) { //当有下一条数据并且和当前值相等时,获取新的下一条
            nextRow = data[++countRowspan + rowIndex];
          }
          if (countRowspan > 1) {
            return {rowspan: countRowspan, colspan: 1};
          }
        }
      }
    },
    cascaderClick(_type) {
      let self = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'levelMajor') {
              self.$refs.cascaderLevelMajor.dropDownVisible = false
            }
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'levelMajor') {
                  self.$refs.cascaderLevelMajor.dropDownVisible = false
                }
              }
            })
      }, 1)
    },
    search() {
      const {initialConversion, levelMajor} = this.form
      console.log(levelMajor, initialConversion)
      if (!initialConversion && (levelMajor === '' || !levelMajor)) {
        this.getList()
        return
      }
      let results = []
      console.log(typeof initialConversion)
      if (initialConversion) {
        results = this.searchList.filter(item => item.initialConversion === initialConversion)
      } else {
        results = this.searchList.slice(0, this.searchList.length)
      }
      if (levelMajor && levelMajor !== '') {
        results = results.filter(item => [item.level, item.major].includes(levelMajor))
      }
      console.log(results, "results")
      this.list = results
    },
    reset() {
      this.form.initialConversion = null
      this.form.levelMajor = ''
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
</style>
