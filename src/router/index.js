import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/box/Header'
import LeftBox from '@/components/box/LeftBox'
import MainBox from '@/components/box/MainBox'
import HouseSave from '@/components/HouseSave'
import HouseShow from '@/components/HouseShow'
import AgencyShow from '@/components/AgencyShow'
import CollectShow from '@/components/CollectShow'
import LoginAndRegister from '@/components/LoginAndRegister'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/showhouse',
    components: {
      'header': Header,
      'left': LeftBox,
      'main': MainBox
    },
    children: [
      {
        path: '/login',
        component: resolve => require(['../components/LoginAndRegister.vue'], resolve),//懒加载
        meta: {title: '登录', requiresAuth: false}
      },
      {
        path: '/showagency',
        component: resolve => require(['../components/AgencyShow.vue'], resolve),//懒加载
        meta: {title: '业务员一览', requiresAuth: false}
      },
      {
        path: '/showhouse',
        component: resolve => require(['../components/HouseShow.vue'], resolve),//懒加载
        meta: {title: '房屋一览', requiresAuth: false}
      },
      {
        path: '/savehouse',
        component: resolve => require(['../components/HouseSave.vue'], resolve),//懒加载
        meta: {role: ['Owner','visitor'], title: '上架房屋', requiresAuth: true,}  //页面需要的权限
      },
      {
        path: '/mycollect',
        component: resolve => require(['../components/CollectShow.vue'], resolve),//懒加载
        requiresAuth: true,
        meta: {role: ['Buyer'], title: '买家收藏', requiresAuth: true,}  //页面需要的权限
      },{
        path: '/myhouse',
        component: resolve => require(['../components/HouseShowMy.vue'], resolve),//懒加载
        meta: {role: ['Owner'], title: '我的房屋', requiresAuth: true}
      },
      {
        path: '/me',
        component: resolve => require(['../components/UserShow.vue'], resolve),//懒加载
        meta: {role: ['Buyer','Owner','Agency'],title: '我的信息', requiresAuth: true}
      },
      {
        path: '/mydeal',
        component: resolve => require(['../components/DealShow.vue'], resolve),//懒加载
        meta: {role: ['Buyer','Owner','Agency'],title: '我的交易', requiresAuth: true}
      },
      {
        path: '/data',
        component: resolve => require(['../components/DataSum.vue'], resolve),//懒加载
        meta: {title: '数据一览', requiresAuth: false}
      },
    ]
  },
  /*{path: '*', redirect: '/404', hidden: true}*/
];

//实例化vue的时候只挂载constantRouter
export default new Router({
  mode: 'history',//不要 #
  routes: constantRouterMap
})

/*//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    components: {
      'header': Header,
      'left': LeftBox,
      'main': MainBox
    },
    name: '权限测试',
    //meta: { role: ['owner','agency'] }, //页面需要的权限
    children: [
      {
        path: '/savehouse',
        component: HouseSave,
        name: '权限测试页',

        meta: {role: 'Owner', title: '上架房屋', requiresAuth: true,}  //页面需要的权限
      },
      {
        path: '/showcollect',
        component: CollectShow,
        requiresAuth: true,
        meta: {role: ['Buyer']}  //页面需要的权限
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];*/
