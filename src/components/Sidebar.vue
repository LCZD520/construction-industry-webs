/**
* Created by Lv Cheng on 2022/2/23
* Notes 侧边栏
*/
<template>
  <div class="sidebar">
    <div class="logo-container" v-if="isCollapse">
      <img style="transition: .5s" width="54" height="54" :src="require('../assets/images/small-logo.png')" alt="">
    </div>
    <div class="logo-container" v-else>
      <img style="transition: .5s" width="190" height="120" :src="require('../assets/images/img.png')" alt="">
    </div>
    <el-scrollbar wrap-style="overflow-x:hidden;" style="height: 100%">
      <el-menu
          :default-active="$route.path"
          background-color="#515a6e"
          text-color="#fff"
          active-text-color="#fff"
          unique-opened
          :class="isCollapse ? 'el-menu-vertical-collapse' : 'el-menu-vertical-demo'"
          router
          :collapse="isCollapse">
        <el-menu-item index="home">
          <i style="color: #fff" :class=" isCollapse ? 'el-icon-s-promotion' : 'el-icon-s-home'"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
          <template slot="title">
            <i style="color: #fff" class="el-icon-ship"></i>
            <span style="transition: .5s" slot="title">
              {{ item.level1_title }}
            </span>
          </template>
          <el-menu-item v-for="subItem in item.subMenuItems" :key="subItem.id"
                        :index="subItem.route">
            <i :class="subItem.icon"></i>
            {{ subItem.level2_title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
    }
  },
  data() {
    return {
      menuList: [
        {
          id: '1',
          level1_title: '业务管理',
          route: '',
          subMenuItems: [
            {
              id: '1-1',
              level2_title: '人才查询',
              icon: 'el-icon-collection-tag',
              route: '/talent-query',
            },
            {
              id: '1-2',
              level2_title: '企业查询',
              icon: 'el-icon-collection-tag',
              route: '/enterprise-query',
            },
            {
              id: '1-3',
              level2_title: '资质收购',
              icon: 'el-icon-collection-tag',
              route: '/qualification-acquisition',
            },
            {
              id: '1-4',
              level2_title: '资质转让',
              icon: 'el-icon-collection-tag',
              route: '/qualification-transfer',
            },
            {
              id: '1-5',
              level2_title: '资质代办',
              icon: 'el-icon-collection-tag',
              route: '/qualification-agency',
            },
            {
              id: '1-6',
              level2_title: '职称评审',
              icon: 'el-icon-collection-tag',
              route: '/title-evaluation',
            },
            {
              id: '1-7',
              level2_title: '三类人员',
              icon: 'el-icon-collection-tag',
              route: '/class-three-personnel',
            },
            {
              id: '1-8',
              level2_title: '学历提升',
              icon: 'el-icon-collection-tag',
              route: '/education-promotion',
            },
          ]
        },
        {
          id: '2',
          level1_title: '订单管理',
          route: '',
          icon: 'el-icon-s-order',
          subMenuItems: [
            {
              id: '2-1',
              level2_title: '人才订单',
              icon: 'el-icon-s-order',
              route: '/order-talent',
            },
            {
              id: '2-2',
              level2_title: '资质转让订单',
              icon: 'el-icon-s-order',
              route: '/order-qualification-transfer',
            },
            {
              id: '2-3',
              level2_title: '职称评审订单',
              icon: 'el-icon-s-order',
              route: '/order-title-evaluation',
            },
            {
              id: '2-4',
              level2_title: '三类人员订单',
              icon: 'el-icon-s-order',
              route: '/order-class-three-personnel',
            },
            {
              id: '2-5',
              level2_title: '学历提升订单',
              icon: 'el-icon-s-order',
              route: '/order-education-promotion',
            },
          ]
        },
        {
          id: '3',
          level1_title: '业绩管理',
          route: '',
          subMenuItems: [
            {
              id: '3-1',
              level2_title: '人才业绩',
              icon: 'el-icon-orange',
              route: '/achievement-talent',
            },
            {
              id: '3-2',
              level2_title: '资质转让业绩',
              icon: 'el-icon-orange',
              route: '/achievement-qualification-transfer',
            },
            {
              id: '3-3',
              level2_title: '资质代办业绩',
              icon: 'el-icon-orange',
              route: '/achievement-qualification-agency',
            },
            {
              id: '3-4',
              level2_title: '职称评审业绩',
              icon: 'el-icon-orange',
              route: '/achievement-title-evaluation',
            },
            {
              id: '3-5',
              level2_title: '三类人员业绩',
              icon: 'el-icon-orange',
              route: '/achievement-class-three-personnel',
            },
            {
              id: '3-6',
              level2_title: '学历提升业绩',
              icon: 'el-icon-orange',
              route: '/achievement-education-promotion',
            },
          ]
        },
        {
          id: '4',
          level1_title: '资源管理',
          route: '',
          subMenuItems: [
            {
              id: '4-1',
              level2_title: '我的人才资源',
              icon: 'el-icon-s-grid',
              route: '/my-talent-resources',
            },
            {
              id: '4-2',
              level2_title: '人才资源汇总',
              icon: 'el-icon-s-grid',
              route: '/summary-talent-resources',
            },
            {
              id: '4-3',
              level2_title: '共享人才资源',
              icon: 'el-icon-s-grid',
              route: '/sharing-talent-resources',
            },
            {
              id: '4-4',
              level2_title: '我的企业资源',
              icon: 'el-icon-s-grid',
              route: '/my-enterprise-resources',
            },
            {
              id: '4-5',
              level2_title: '企业资源汇总',
              icon: 'el-icon-s-grid',
              route: '/summary-enterprise-resources',
            },
            {
              id: '4-6',
              level2_title: '共享企业资源',
              icon: 'el-icon-s-grid',
              route: '/share-enterprise-resources',
            },
          ]
        },
        {
          id: '5',
          level1_title: '转账管理',
          route: '',
          subMenuItems: [
            {
              id: '5-1',
              level2_title: '人才转账',
              icon: 'el-icon-location',
              route: '/transfer-talent',
            },
            {
              id: '5-2',
              level2_title: '企业转账',
              icon: 'el-icon-location',
              route: '/transfer-enterprise',
            },
            {
              id: '5-3',
              level2_title: '资质收购转账',
              icon: 'el-icon-location',
              route: '/transfer-qualification-acquisition',
            },
            {
              id: '5-4',
              level2_title: '资质转让转账',
              icon: 'el-icon-location',
              route: '/transfer-of-qualification',
            },
            {
              id: '5-5',
              level2_title: '资质代办转账',
              icon: 'el-icon-location',
              route: '/transfer-qualification-agency',
            },
            {
              id: '5-6',
              level2_title: '职称评审转账',
              icon: 'el-icon-location',
              route: '/transfer-title-evaluation',
            },
            {
              id: '5-7',
              level2_title: '三类人员转账',
              icon: 'el-icon-location',
              route: '/transfer-class-three-personnel',
            },
            {
              id: '5-8',
              level2_title: '学历提升转账',
              icon: 'el-icon-location',
              route: '/transfer-education-promotion',
            },
          ]
        },
        {
          id: '6',
          level1_title: '入账管理',
          route: '',
          subMenuItems: [
            {
              id: '6-1',
              level2_title: '入账登记',
              icon: 'el-icon-location',
              route: '/entry-registration',
            },
            {
              id: '6-2',
              level2_title: '人才合同价入账',
              icon: 'el-icon-location',
              route: '/entry-talent-contract',
            },
            {
              id: '6-3',
              level2_title: '资质转让入账',
              icon: 'el-icon-location',
              route: '/entry-qualification-transfer',
            },
            {
              id: '6-4',
              level2_title: '资质代办入账',
              icon: 'el-icon-location',
              route: '/entry-qualification-agency',
            },
            {
              id: '6-5',
              level2_title: '职称评审入账',
              icon: 'el-icon-location',
              route: '/entry-title-evaluation',
            },
            {
              id: '6-6',
              level2_title: '三类人员入账',
              icon: 'el-icon-location',
              route: '/entry-class-three-personnel',
            },
            {
              id: '6-7',
              level2_title: '学历提升入账',
              icon: 'el-icon-location',
              route: '/entry-education-promotion',
            },
          ]
        },
        {
          id: '7',
          level1_title: '库存管理',
          route: '',
          subMenuItems: [
            {
              id: '7-1',
              level2_title: '证件库',
              icon: 'el-icon-location',
              route: '/lib-certificate',
            },
          ]
        },
        {
          id: '8',
          level1_title: '后勤管理',
          route: '',
          subMenuItems: [
            {
              id: '8-1',
              level2_title: '后勤确认',
              icon: 'el-icon-location',
              route: '/confirm-logistics',
            },
          ]
        },
        {
          id: '9',
          level1_title: '统计分析',
          route: '',
          subMenuItems: [
            {
              id: '9-1',
              level2_title: '录入量统计',
              icon: 'el-icon-location',
              route: '/statistics-input-quantity',
            },
            {
              id: '9-2',
              level2_title: '证书统计',
              icon: 'el-icon-location',
              route: '/statistics-certificate',
            },
          ]
        },
        {
          id: '10',
          level1_title: '基础数据',
          route: '',
          subMenuItems: [
            {
              id: '10-1',
              level2_title: '角色管理',
              icon: 'el-icon-location',
              route: '/management-role',
            },
            {
              id: '10-2',
              level2_title: '组织管理',
              icon: 'el-icon-location',
              route: '/management-organization',
            },
          ]
        },
        {
          id: '11',
          level1_title: '系统管理',
          route: '',
          subMenuItems: [
            {
              id: '11-1',
              level2_title: '操作日志',
              icon: 'el-icon-location',
              route: '/operation-log',
            },
            {
              id: '11-2',
              level2_title: '系统公告',
              icon: 'el-icon-location',
              route: '/system-notice',
            },
            {
              id: '11-3',
              level2_title: '数据转移',
              icon: 'el-icon-location',
              route: '/data-transfer',
            },
            {
              id: '11-4',
              level2_title: '证书类别',
              icon: 'el-icon-location',
              route: '/certificate-category',
            },
            {
              id: '11-5',
              level2_title: '资质类别',
              icon: 'el-icon-location',
              route: '/qualification-category',
            },
            {
              id: '11-6',
              level2_title: '公司账户',
              icon: 'el-icon-location',
              route: '/company-account',
            },
            {
              id: '11-7',
              level2_title: '审批管理',
              icon: 'el-icon-location',
              route: '/management-approval',
            },
            {
              id: '11-8',
              level2_title: '高级设置',
              icon: 'el-icon-location',
              route: '/advanced-setting',
            },
          ]
        },
      ],
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  margin-top: 135px;
}

.el-menu-vertical-collapse {
  transition: .5s;
  margin-top: 68px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: .5s;
  background: #515a6e;
  overflow-y: auto;

  &::-webkit-scrollbar {
    //display: none;
  }

  .logo-container {
    z-index: 10000;
    padding: 5px;
    text-align: center;
    background: #515a6e;
    position: fixed;
    top: 0;
    left: 0
  }
}

/deep/ .el-menu-item.is-active {
  background: #409EFF !important;
}

/deep/ .el-submenu__title:hover {
  background: #409EFF !important;
  color: #fff;
}

</style>

