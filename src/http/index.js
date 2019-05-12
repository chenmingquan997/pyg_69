//  导出一个配置好的axios
import axios from 'axios'

// 全局使用  依赖vue构造函数  在main.js中使用
// baseURL配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(res => {
  // 判断token是否失效
  if (res.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return res
  }
})
// 导出
export default axios
