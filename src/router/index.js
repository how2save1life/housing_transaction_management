import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/box/Header'
import LeftBox from '@/components/box/LeftBox'
import MainBox from '@/components/box/MainBox'
import HelloWorld from '@/components/HelloWorld'
import HouseSave from '@/components/HouseSave'
import HouseShow from '@/components/HouseShow'
import AgencyShow from '@/components/AgencyShow'
import CollectShow from '@/components/CollectShow'
import LoginAndRegister from '@/components/LoginAndRegister'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      components: {
        'header': Header,
        'left': LeftBox,
        'main': MainBox
      },
      children:[
        {
          path: '/login',
          component: LoginAndRegister
        },
        {
          path: '/savehouse',
          component: HouseSave
        },
        {
          path:'/showhouse',
          component:HouseShow,
        },
        {
          path:'/showagency',
          component:AgencyShow,
        },
        {
          path:'/showcollect',
          component:CollectShow,
        }
      ]
    },
   /* ,{
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
  ]
})
