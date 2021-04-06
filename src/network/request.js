import axios from 'axios'
// export function request (config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  // axios的拦截器
  // 请求拦截的作用
  instance.interceptors.request.use(config => {
    console.log(config)
    // 比如config中的信息不符合服务器的要求
    // 比如显示请求的图标
    // 比如某些网络请求登陆（token），必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err)
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    return res
  }, err => {
    console.log(err)
  })
  return instance(config)
}
