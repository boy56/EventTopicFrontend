// for App.vue router-view
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'modules/Home.vue'
import Xuanti from 'modules/xuanti/Home.vue'
import View from 'modules/view/Home.vue'
import Eventa from 'modules/eventa/Home.vue'

Vue.use(Router)

const router = new Router({
  base: '/WuhanBoat',
  routes: [
    {
      // 首页路由
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // ring路由
      path: '/xuanti',
      name: 'xuanti',
      component: Xuanti
    },
    {
      // ring路由
      path: '/view',
      name: 'view',
      component: View
    },
    {
      // ring路由
      path: '/eventa',
      name: 'eventa',
      component: Eventa
    },
  ],
  // mode: "history"
});

export default router;
