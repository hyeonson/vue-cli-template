import Vue from 'vue'
import Router from 'vue-router'
import PosterReg from '@/pages/PosterReg'
import AllPosters from '@/pages/AllPosters'
import SignIn from '@/pages/SignIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PosterReg',
      component: PosterReg
    },
    {
      path: '/posters',
      name: 'AllPosters',
      component: AllPosters
    },
    // {
    //   path: '/posters/:posterIdx',
    //   name: 'PosterDetail',
    //   component: PosterDetail
    // },
    {
      path: '/login',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '*',
      name: 'NotFound',
      component: {template: '<div>요청한 페이지를 찾을 수 없습니다</div>'}
    }
  ]
})
