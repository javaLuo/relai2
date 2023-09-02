/** 对axios做一些配置 **/

import { baseUrl } from '../config'
import axios from 'axios'

/**
 * 根据不同环境设置不同的请求地址
 * 把返回值赋给axios.defaults.baseURL即可
 */
// function setBaseUrl(){
//   switch(process.env.NODE_ENV){
//     case 'development': return 'http://development.com';
//     case 'test': return 'http://test.com';
//     case 'production' : return 'https://production.com';
//     default : return baseUrl;
//   }
// }

// 默认基础请求地址
axios.defaults.baseURL = baseUrl
// 请求是否带上cookie
axios.defaults.withCredentials = false
// 对返回的结果做处理
axios.interceptors.response.use((response) => {
  return response.data
})

export default axios
