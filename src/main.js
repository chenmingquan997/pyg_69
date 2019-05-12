// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
// 依赖字体图标
import './assets/fonts/iconfont.css'
// 依赖配置好的axios
import axios from './http'
// 引入element-ui文件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi, { size: 'small' })

Vue.prototype.$http = axios
// 控制台的日志更详细一些 true
Vue.config.productionTip = false
// 导入其他依赖

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
