import axios from 'axios'
import type { AxiosResponse, AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com', //后期我们会把它替换成环境变量
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加认证 token
    // config.headers['Authorization'] = 'Bearer ' + getToken();
    return config
  },
  (error: AxiosError) => {
    // 请求错误处理
    ElNotification({
      title: 'Error',
      message: 'Request Error: ' + error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200) {
      // 根据实际业务修改状态码不是 200 时的逻辑
      ElNotification({
        title: 'Error',
        message: res.message || 'Error',
        type: 'error',
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    ElNotification({
      title: 'Error',
      message: 'Response Error: ' + error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default service
