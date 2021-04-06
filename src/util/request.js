import axios from 'axios'

// axios.defaults.baseURL = 'https://appservice.lzu.edu.cn/api/eusp-unify-terminal/app-user/login'
// 在请求中添加token
axios.interceptors.request.use(config => {
  config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidXNlclJvbGUiOiJhZG1pbiIsImV4cCI6MTYxNjMwODA4Nn0.Y2b2jUX5wTqrSqcWEDcf-DIvVMze700fX4SX2NADvoU'
  return config
})
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // response的拦截
    if (response.data) {
      // 首先要判断他的值以及他的code值，如果是200,等真确的码则将response返回出来，如果是错误的就使用Promise方法将错误输出
      return response
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
    // 将错误信息返回给前端页面
  }
)
export default axios
