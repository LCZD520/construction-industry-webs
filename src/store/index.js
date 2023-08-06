/**
 * Created by Lv Cheng on 2022/3/6
 * Notes
 */

import Vue from 'vue'
import Vuex from 'vuex'
import enterprise from "./modules/enterprise";
import mechanisms from "./modules/mechanism";
import qualificationAgency from "./modules/qualificationAgency";
import titleEvaluation from "./modules/titleEvaluation";
import classThreePersonnel from "./modules/classThreePersonnel";
import educationPromotion from "./modules/educationPromotion";
// vuex持久化
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        bool_options: [
            {
                value: true,
                label: '是'
            },
            {
                value: false,
                label: '否'
            }
        ],
        bool2_options: [
            {
                value: true,
                label: '确认'
            },
            {
                value: false,
                label: '不予确认'
            }
        ],
        bool3_options: [
            {
                value: true,
                label: '有'
            },
            {
                value: false,
                label: '无'
            }
        ],
        bool4_options: [
            {
                value: true,
                label: '通过'
            },
            {
                value: false,
                label: '不通过'
            }
        ],
        sex_options: [
            {
                value: 1,
                label: '男'
            },
            {
                value: 2,
                label: '女'
            },
            {
                value: 3,
                label: '未知'
            }
        ],
        education_options: [
            {
                value: 1,
                label: '博士'
            },
            {
                value: 2,
                label: '研究生'
            },
            {
                value: 3,
                label: '本科'
            },
            {
                value: 4,
                label: '大专'
            },
            {
                value: 5,
                label: '中专'
            },
            {
                value: 6,
                label: '高中'
            },
            {
                value: 7,
                label: '初中'
            },
            {
                value: 8,
                label: '小学'
            },
        ],
        title_options: [
            {
                value: 1,
                label: '中级'
            },
            {
                value: 2,
                label: '高级'
            },
            {
                value: 3,
                label: '其他'
            },
        ],
        tender_exit_options: [
            {
                value: 1,
                label: '可出场不招标'
            },
            {
                value: 2,
                label: '不出场可招标'
            },
            {
                value: 3,
                label: '出场招标'
            },
            {
                value: 4,
                label: '项目'
            },
            {
                value: 5,
                label: '资质'
            },
            {
                value: 6,
                label: '其他情况'
            },
        ],
        class_three_personnel_options: [
            {
                value: 1,
                label: '带A证'
            },
            {
                value: 2,
                label: '带B证'
            },
            {
                value: 3,
                label: '带C证'
            },
            {
                value: 4,
                label: '可考A证'
            },
            {
                value: 5,
                label: '可考B证'
            },
            {
                value: 6,
                label: '可考C证'
            },
            {
                value: 7,
                label: '不考A证'
            },
            {
                value: 8,
                label: '不考B证'
            },
            {
                value: 9,
                label: '不考C证'
            },
        ],
        certificate_status_options: [
            {
                value: 1,
                label: '正常'
            },
            {
                value: 2,
                label: '不正常'
            }
        ],
        talent_status_options: [
            {
                value: 1,
                label: '证书在公司'
            },
            {
                value: 2,
                label: '人才在公示订单中'
            },
            {
                value: 3,
                label: '订单执行中'
            },
            {
                value: 4,
                label: '订单完成'
            },
            {
                value: 5,
                label: '证件已退'
            },
        ],
        // 人才订单状态
        talent_order_status_options: [
            {
                value: 1,
                label: '人才待确认'
            },
            {
                value: 2,
                label: '订单执行中'
            },
            {
                value: 3,
                label: '订单执行完成'
            },
        ],
        initial_conversion_options: [
            {
                value: 1,
                label: '初始'
            },
            {
                value: 2,
                label: '转注'
            },
            {
                value: 3,
                label: '其他'
            }
        ],
        number_unit_options: [
            {
                value: 1,
                label: '年'
            },
            {
                value: 2,
                label: '月'
            },
            {
                value: 3,
                label: '日'
            }
        ],
        funds_purpose_options: [
            {
                value: 1,
                label: '证件在公司预付款'
            },
            {
                value: 2,
                label: '注册成功预付款'
            },
            {
                value: 3,
                label: '注册成功中期款'
            },
            {
                value: 4,
                label: '注册成功尾款'
            },
            {
                value: 5,
                label: '注册成功B证费用'
            },
            {
                value: 6,
                label: '一次性付款'
            },
            {
                value: 7,
                label: '其他用途'
            },
            {
                value: 8,
                label: '由公司垫钱'
            },
        ],
        funds_purpose_options2: [
            {
                value: 1,
                label: '企业预付款'
            },
            {
                value: 2,
                label: '企业中期款'
            },
            {
                value: 3,
                label: '企业尾款'
            },
            {
                value: 3,
                label: '一次性付款'
            }
        ],
        //
        is_need_options: [
            {
                value: true,
                label: '需要'
            },
            {
                value: false,
                label: '不需要'
            }
        ],
        // 后勤申请状态
        logistics_status_options: [
            {
                value: 1,
                label: '待确认'
            },
            {
                value: 2,
                label: '已确认'
            },
            {
                value: 3,
                label: '不予确认'
            },
        ],
        // 后勤项目类型
        logistics_project_options: [
            {
                value: 1,
                label: '招待'
            },
            {
                value: 2,
                label: '邮费'
            },
            {
                value: 3,
                label: '转B证'
            },
            {
                value: 4,
                label: '继续教育'
            },
            {
                value: 5,
                label: '登报'
            },
            {
                value: 6,
                label: '做资料'
            },
            {
                value: 7,
                label: '外出办事'
            },
            {
                value: 8,
                label: '其他'
            },
        ],
        bank_options: [
            {
                value: 1,
                label: '中国银行'
            },
            {
                value: 2,
                label: '中国工商银行'
            },
            {
                value: 3,
                label: '中国农业银行'
            },
            {
                value: 4,
                label: '中国建设银行'
            },
            {
                value: 5,
                label: '交通银行'
            },
            {
                value: 6,
                label: '中国邮政储蓄银行'
            },
            {
                value: 7,
                label: '招商银行'
            },
            {
                value: 8,
                label: '中信银行'
            },
            {
                value: 9,
                label: '兴业银行'
            },
            {
                value: 10,
                label: '广东发展银行'
            },
            {
                value: 11,
                label: '中国光大银行'
            },
            {
                value: 12,
                label: '上海浦东发展银行'
            },
            {
                value: 13,
                label: '华夏银行'
            },
            {
                value: 14,
                label: '平安银行'
            },
            {
                value: 15,
                label: '中国民生银行'
            },
            {
                value: 16,
                label: '农村信用社'
            },
            {
                value: 17,
                label: '广西北部湾银行'
            },
            {
                value: 18,
                label: '柳州银行'
            },
            {
                value: 19,
                label: '桂林银行'
            },
            {
                value: 20,
                label: '北京银行'
            },
            {
                value: 21,
                label: '上海银行'
            },
            {
                value: 22,
                label: '天津银行'
            },
            {
                value: 23,
                label: '江苏银行'
            },
            {
                value: 24,
                label: '商业银行'
            },
        ],
        user_options: [],
        // 登录状态
        loginStatus: false,
        currentUser: {},
        // 侧边栏菜单
        listMenus: [],

        // 证书去向
        certificates_whereabouts_options: [
            {
                value: 1,
                label: '证书在公司'
            },
            {
                value: 2,
                label: '证书提交到用人单位'
            },
            {
                value: 3,
                label: '证件已还人才'
            },
            {
                value: 4,
                label: '其他'
            },
        ],
        // 证件类型
        certificates_category_options: [
            {
                value: 1,
                label: '毕业证'
            },
            {
                value: 2,
                label: '资格证'
            },
            {
                value: 3,
                label: '注册证'
            },
            {
                value: 4,
                label: '身份证'
            },
            {
                value: 5,
                label: '职称证'
            },
            {
                value: 6,
                label: '安全员A证'
            },
            {
                value: 7,
                label: '安全员B证'
            },
            {
                value: 8,
                label: '安全员C证'
            },
            {
                value: 9,
                label: '红头文件'
            },
            {
                value: 10,
                label: '评审表'
            },
            {
                value: 11,
                label: '照片'
            },
            {
                value: 12,
                label: '印章'
            },
            {
                value: 13,
                label: '安全教育'
            },
            {
                value: 14,
                label: '登记证'
            },
            {
                value: 15,
                label: '执业资格考试登记表'
            },
            {
                value: 16,
                label: '岗位证书'
            },
            {
                value: 17,
                label: '岗位培训考核合格证书'
            },
            {
                value: 18,
                label: '增项证'
            },
            {
                value: 19,
                label: '离职证明'
            },
            {
                value: 20,
                label: '诚信卡'
            },
            {
                value: 21,
                label: '其他'
            },
        ],
        // 审批状态
        application_status_options: [
            {
                value: 1,
                label: '已申请待审批'
            },
            {
                value: 2,
                label: '一次审核审批通过'
            },
            {
                value: 3,
                label: '一次审核审批不通过'
            },
            {
                value: 4,
                label: '二次审核审批通过'
            },
            {
                value: 5,
                label: '二次审核审批不通过'
            },
            {
                value: 6,
                label: '财务审批通过'
            },
            {
                value: 7,
                label: '财务审批不通过'
            },
            {
                value: 8,
                label: '出纳审核不通过'
            },
            {
                value: 9,
                label: '出纳审核不通过'
            }
        ],

        // 资质收购状态
        qualification_status_options: [
            {
                value: 1,
                label: '签约客户'
            },
            {
                value: 2,
                label: '资质已在公示订单中'
            },
            {
                value: 3,
                label: '执行中客户'
            },
            {
                value: 4,
                label: '完成客户'
            },
        ],
        // 资质转让状态
        qualification_transfer_status_options: [
            {
                value: 1,
                label: '签约客户'
            },
            {
                value: 2,
                label: '执行中'
            },
            {
                value: 3,
                label: '执行完成客户'
            },
        ],
        // 资质转让订单状态
        qualification_transfer_order_status_options: [
            {
                value: 1,
                label: '资质待确认'
            },
            {
                value: 2,
                label: '资质确认不通过'
            },
            {
                value: 3,
                label: '订单待确认'
            },
            {
                value: 4,
                label: '订单确认不通过'
            },
            {
                value: 5,
                label: '订单执行中'
            },
            {
                value: 6,
                label: '完成待确认'
            },
            {
                value: 7,
                label: '完成确认不通过'
            },
            {
                value: 8,
                label: '订单已完成'
            },
        ],
        // 企业资质
        enterprise_qualification_options: [
            {
                value: 1,
                label: '甲级'
            },
            {
                value: 2,
                label: '乙级'
            },
            {
                value: 3,
                label: '一级'
            },
            {
                value: 4,
                label: '二级'
            },
            {
                value: 5,
                label: '三级'
            },
        ],
        // 市场开发费用单位
        market_dev_fee_unit_options: [
            {
                value: 1,
                label: '人'
            },
            {
                value: 2,
                label: '单'
            },
        ],

        // 证书分类
        list_certificate_category: [],
        // 企业状态
        enterprise_status_options: [
            {
                value: 1,
                label: '签约客户'
            },
            {
                value: 2,
                label: '执行中客户'
            },
            {
                value: 3,
                label: '完成客户'
            },
        ],

        customer_type_options: [
            {
                value: 1,
                label: '潜在客户'
            },
            {
                value: 2,
                label: '重点客户'
            },
            {
                value: 3,
                label: '回访客户'
            },
            {
                value: 4,
                label: '签约客户'
            },
            {
                value: 5,
                label: '中介同行'
            },
        ],

        /**
         * 企业客户类型
         */
        enterprise_customer_type_options: [
            {
                value: 1,
                label: '签约客户'
            },
            {
                value: 2,
                label: '执行中客户'
            },
            {
                value: 3,
                label: '完成客户'
            },
        ],

        // 资质分类
        list_qualification_category: [],

        // 资质代办状态
        qualification_agency_status_options: [
            {
                value: 1,
                label: '待确认执行'
            },
            {
                value: 2,
                label: '执行中'
            },
            {
                value: 3,
                label: '执行完成客户'
            },
            {
                value: 4,
                label: '执行确认不通过'
            },
        ],
        // 订单入账
        order_entry_options: [
            {
                value: 1,
                label: '企业预付款'
            },
            {
                value: 2,
                label: '企业中期款'
            },
            {
                value: 3,
                label: '注册成功尾款'
            },
            {
                value: 4,
                label: '注册成功B证费用'
            },
            {
                value: 5,
                label: '一次性付款'
            },
        ],
        // 转账方式
        order_transfer_way_options: [
            {
                value: 1,
                label: '银行转账'
            },
            {
                value: 2,
                label: '现金'
            },
            {
                value: 3,
                label: '支票'
            },
        ],

        talent_entry_status_options: [
            {
                value: 1,
                label: '已申请待审批'
            },
            {
                value: 2,
                label: '财务审批通过'
            },
            {
                value: 3,
                label: '财务审批不通过'
            },
        ],
        // 证书性质
        certificate_nature_options: [
            {
                value: 1,
                label: '公有'
            },
            {
                value: 2,
                label: '非公'
            }
        ],
        // 鉴定方式
        appraisal_way_options: [
            {
                value: 1,
                label: '鉴定'
            },
            {
                value: 2,
                label: '网查'
            },
            {
                value: 3,
                label: '鉴定和网查'
            },
        ],
        // 客户类型
        title_customer_type_options: [
            {
                value: 1,
                label: '企业客户'
            },
            {
                value: 2,
                label: '个人客户'
            },
        ],

        // 角色列表
        roleList: [],

        // 职称评审人员状态
        title_evaluation_status_options: [
            {
                value: 1,
                label: '待评审'
            },
            {
                value: 2,
                label: '评审中'
            }
        ],
        // 职称评审订单转账款项用途
        title_evaluation_transfer_funds_purpose_options: [
            {
                value: 1,
                label: '预付款'
            },
            {
                value: 2,
                label: '尾款'
            },
            {
                value: 3,
                label: '一次性付款'
            },
            {
                value: 4,
                label: '定金退款'
            },
        ],
        // 职称评审、三类人员、学历提升订单状态
        title_evaluation_order_status_options: [
            {
                value: 1,
                label: '订单待确认'
            },
            {
                value: 2,
                label: '订单执行中'
            },
            {
                value: 3,
                label: '订单已完成'
            },
            {
                value: 4,
                label: '取消订单'
            },
        ],
        // 职称评审/三类人员/学历提升订单状态
        common_order_status_options: [
            {
                value: 1,
                label: '订单待确认'
            },
            {
                value: 2,
                label: '订单执行中'
            },
            {
                value: 3,
                label: '订单已完成'
            }
        ],
        // 顶部申请状态搜索下拉选项
        common_application_status_search_options: [
            {
                value: '已申请待审批',
            },
            {
                value: '一次审核审批通过',
            },
            {
                value: '一次审核审批不通过',
            },
            {
                value: '二次审核审批通过',
            },
            {
                value: '二次审核审批不通过',
            },
            {
                value: '财务审批通过',
            },
            {
                value: '财务审批不通过',
            },
            {
                value: '出纳审批通过',
            },
            {
                value: '出纳审批不通过',
            },
        ],
        // 公司账户列表
        listCompanyAccounts: [],
        // 资质转让入账款项用途
        qualification_transfer_entry_funds_purpose_options: [
            {
                value: 1,
                label: '企业预付款'
            },
            {
                value: 2,
                label: '企业中期款'
            },
            {
                value: 3,
                label: '企业尾款'
            },
            {
                value: 4,
                label: '一次性付款'
            },
        ],
        // 资质代办款项用途
        qualification_agency_funds_purpose_options: [
            {
                value: 1,
                label: '企业预付款'
            },
            {
                value: 2,
                label: '企业尾款'
            },
            {
                value: 3,
                label: '一次性付款'
            },
        ],
        // 职称评审款项用途
        title_evaluation_funds_purpose_options: [
            {
                value: 1,
                label: '企业预付款'
            },
            {
                value: 2,
                label: '企业中期款'
            },
            {
                value: 3,
                label: '企业尾款'
            },
            {
                value: 4,
                label: '一次性付款'
            },
            {
                value: 5,
                label: '定金退款'
            },
        ],
        /**
         * 在线用户列表
         */
        listOnlineUsers: [],

    },
    mutations: {
        CHANGE_LOGIN_STATUS(state, result) {
            state.loginStatus = result
        },
        UPDATE_LOADING_STATUS(state, result) {
            state.loading = result
        },
        UPDATE_CURRENT_USER(state, result) {
            state.currentUser = result
        },
        INIT_LIST_MENUS(state, result) {
            state.listMenus = result
        },
        INIT_LIST_USERS(state, result) {
            state.user_options = result
        },
        INIT_LIST_CERTIFICATE_CATEGORY(state, result) {
            state.list_certificate_category = result
        },
        INIT_LIST_QUALIFICATION_CATEGORY(state, result) {
            state.list_qualification_category = result
        },
        INIT_ROLE_LIST(state, result) {
            state.roleList = result
        },
        INIT_LIST_COMPANY_ACCOUNTS(state, result) {
            state.listCompanyAccounts = result
        },
        UPDATE_LIST_ONLINE_USERS(state, result) {
            state.listOnlineUsers = result
        },
    },
    actions: {
        changeLoginStatus({commit}, data) {
            commit("CHANGE_LOGIN_STATUS", data)
        },
        updateLoadingStatus({commit}, data) {
            commit("UPDATE_LOADING_STATUS", data)
        },
        updateCurrentUser({commit}, data) {
            commit("UPDATE_CURRENT_USER", data)
        },
        initListMenus({commit}, data) {
            console.log(data)
            commit("INIT_LIST_MENUS", data)
        },
        initListUsers({commit}, data) {
            commit("INIT_LIST_USERS", data)
        },
        initListCertificateCategory({commit}, data) {
            commit("INIT_LIST_CERTIFICATE_CATEGORY", data)
        },
        initListQualificationCategory({commit}, data) {
            commit("INIT_LIST_QUALIFICATION_CATEGORY", data)
        },
        initRoleList({commit}, data) {
            commit("INIT_ROLE_LIST", data)
        },
        initListCompanyAccounts({commit}, data) {
            commit("INIT_LIST_COMPANY_ACCOUNTS", data)
        },
        updateListOnlineUsers({commit}, data) {
            commit("UPDATE_LIST_ONLINE_USERS", data)
        },
    },
    modules: {
        enterprise,
        mechanisms,
        qualificationAgency,
        titleEvaluation,
        classThreePersonnel,
        educationPromotion,
    },
    plugins: [vuexLocal.plugin]
})
