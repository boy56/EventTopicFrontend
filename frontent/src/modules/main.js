// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 置顶bootstrap.css,以备让后面的css覆盖
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome-webpack'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import router from './router.js'
import store from './store.js'
import '../../libs/date.format.js'
// import '../../libs/bg.js'
import 'components/Common'
import axios from 'axios'
axios.defaults.baseURL = 'http://ring.act.buaa.edu.cn/FeatureEvent/'
Vue.prototype.axios = axios
Vue.config.devtools = true
Vue.use(BootstrapVue)
Vue.config.productionTip = true
Vue.prototype._ = _;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
