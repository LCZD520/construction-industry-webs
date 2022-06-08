<template>
  <div class="home">
      系统公告
      人才订单公示确认
      资质转让订单确认
      合同即将到期
      证书继续教育提醒
      三类人员继续教育提醒
    <div class="pagination">

    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      activeName: 'one',
      columns1: [
        {
          title: '标题',
          key: 'name',
        },
        {
          title: '发布时间',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          // eslint-disable-next-line no-unused-vars
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('我触发了')
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('我触发了')
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          name: '王小明',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          address: '深圳市南山区深南大道'
        }
      ],
      columns2: [
        {
          title: '订单编号',
          key: 'name',
        },
        {
          title: '企业名称',
          key: 'address'
        },
        {
          title: '人才名称',
          key: 'address'
        },
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '人才价格',
          key: 'address'
        },
        {
          title: '订单需求',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '企业录入人',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          // eslint-disable-next-line no-unused-vars
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('我触发了')
                  }
                }
              }, '确认'),
            ]);
          }
        }
      ],
      data2: [
        {
          name: '王小明',
          address: '1111'
        },
        {
          name: '张小刚',
          address: '1111'
        },
        {
          name: '李小红',
          address: '1111'
        },
        {
          name: '周小伟',
          address: '1111'
        }
      ],
      columns3: [
        {
          title: '订单编号',
          key: 'name',
        },
        {
          title: '收购意向客户',
          key: 'address'
        },
        {
          title: '资质需求',
          key: 'address'
        },
        {
          title: '收购金额',
          key: 'address'
        },
        {
          title: '成交金额',
          key: 'address'
        },
        {
          title: '转让意向客户',
          key: 'address'
        },
        {
          title: '存在资质',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '资质收购录入人',
          key: 'address'
        },
        {
          title: '资质转让录入人',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          // eslint-disable-next-line no-unused-vars
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log('我触发了')
                  }
                }
              }, '确认'),
            ]);
          }
        }
      ],
      data3: [
        {
          name: '王小明',
          address: '1111'
        },
        {
          name: '张小刚',
          address: '1111'
        },
        {
          name: '李小红',
          address: '1111'
        },
        {
          name: '周小伟',
          address: '1111'
        }
      ],
      columns4: [
        {
          title: '到期时间',
          key: 'name',
        },
        {
          title: '人才名称',
          key: 'address'
        },
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '挂靠企业名称',
          key: 'address'
        },
      ],
      data4: [
        {
          name: '王小明',
          address: '1111'
        },
        {
          name: '张小刚',
          address: '1111'
        },
        {
          name: '李小红',
          address: '1111'
        },
        {
          name: '周小伟',
          address: '1111'
        }
      ],
      columns5: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '级别-专业-初转',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间',
          key: 'address'
        },
      ],
      data5: [
        {
          name: '王小明',
          address: '1111'
        },
        {
          name: '张小刚',
          address: '1111'
        },
        {
          name: '李小红',
          address: '1111'
        },
        {
          name: '周小伟',
          address: '1111'
        }
      ],
      columns6: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间',
          key: 'address'
        },
        {
          title: '录入人',
          key: 'address'
        },
      ],
      data6: [
        {
          name: '王小明',
          address: '1111'
        },
        {
          name: '张小刚',
          address: '1111'
        },
        {
          name: '李小红',
          address: '1111'
        },
        {
          name: '周小伟',
          address: '1111'
        }
      ],
    }
  },
  mounted() {
  },
  methods: {
    handleClick() {

    },
    show (index) {
      this.$Modal.info({
        title: '用户信息',
        content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].age}<br>地址：${this.data1[index].address}`
      })
    },
    remove (index) {
      this.data1.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="less">
//.welcome{
//  font:bold 50px/2 "KaiTi";
//  color: #409EFF;
//}
.pagination{
  margin-top: 10px;
  text-align: center;
}
</style>
