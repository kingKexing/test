import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
// import {
//   getToken
// } from '@/api/sysUser' // 验权


router.beforeEach((to, from, next) => {
  if (sessionStorage.LOGIN_STATE != 1) {
    if (to.path !== '/login') {
      // console.log('==============--------------=======', sessionStorage.LOGIN_STATE);
      next('/login')
      // next()
    }
    next()
  }
  next()
})
