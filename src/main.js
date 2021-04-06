import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import qs from 'qs'
import store from './store'
import { request } from './network/request'

// axios.defaults.baseURL = 'https://appservice.lzu.edu.cn/api/eusp-unify-terminal/app-user/login'
// 在请求中添加token
axios.interceptors.request.use(config => {
  config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidXNlclJvbGUiOiJhZG1pbiIsImV4cCI6MTYxMzU2MDkwNn0.yP9nXrQWxXb4gJsch2vM9XaG24eCvoSZREz8gF6HKpI'
  return config
})
// axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$store = store
Vue.prototype.$http = axios
Vue.prototype.qs = qs
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000
// axios({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res)
// })
// axios({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })
// axios.all([axios({
//   url: '/home/multidata'
// }), axios({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// })]).then(axios.spread((res1, res2) => {
//   console.log(res1)
//   console.log(res2)
// }))
// const instance1 = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res)
// })
// const instance2 = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 50000
// })
// instance2({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })
request({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
