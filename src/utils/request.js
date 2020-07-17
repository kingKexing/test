import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'
// import qs from 'qs'
import Vue from 'vue'
import Router from 'vue-router'

// const router = new VueRouter({
//   routes // (缩写) 相当于 routes: routes
// })

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000
  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Access-Control-Allow-Origin'] = '*'
    if (store.getters.token) {
      config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code === 200) {
      return response.data
    } else {
      /* Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      }) */
      if (res.code === 500) {
        console.log('请求失败')
      } else if (res.code === 401 || res.code === 403) {
        location.href = '/qgy'
        console.log('locationlocation', location); // 此语句要删除
        if (localStorage) localStorage.removeItem('token');
        this.$router.push({
          path: this.redirect || "/dashboard"
        });
      } else {
        console.log('数据异常', res.code)
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
