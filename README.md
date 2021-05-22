## vue3.x版本的安装
```python
    npm install vue -g
    vue create 'project'
```
### vue3.x版本与axios异步请求

> axios安装 `npm i axios vue-axios -S`

### 封装axios文件

> 在 `src` 中创建 `until` 文件夹，创建 `api.js` 、`request.js`

**request.js**
> 二次封装的axios

```python
import axios from 'axios'

// 创建axios
const service = axios.create({
  baseURL: '/api'
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('res',response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;
```
**api.js**

> 里面放置所有请求接口

```python
import service from "./request"

// 获取seller
export function shopType(){
  return service.request({
    method:'get',
    url:'index_category',
  })
}
```

###跨域配置
> 在根目录创建vue.config.js

**vue.config.js**
```python
module.exports = {
    devServer: {
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: 8911,
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        proxy: {
            //配置跨域
            '/api': {
                target: "http://localhost:4000",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    }
  }
```


### 使用方法
**HelloWorld.vue**
```python
<script>
import {shopType} from '../until/api'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async mounted(){
    const {data:res} = await shopType()
      console.log(res)
      
  }
}
</script>
```