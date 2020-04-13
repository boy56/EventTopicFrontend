<template>
  <div id="app" class="real-body">
    <!-- <v-header></v-header> -->
    <!--通过vue-router控制主内容区域变换-->
    <!-- <router-view></router-view> -->
    <v-home></v-home>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'
// import Header from 'D:\\work\\wuhan_2\\wuhan\\frontent\\src\\components\\header\\xuanti_Header.vue'
// import Header from 'components\\header\\xuanti_Header.vue'
import Footer from 'components/header/Footer.vue'
import Home from 'modules/xuanti/Home.vue'

// Require custom echarts theme.
import 'components/charts/theme/Ring.js'

/* Globally bus for Non Parent-Child Communication */
window.bus = new Vue();

export default {
  name: 'app',
  components: {
    // 'v-header': Header,
    'v-home': Home,
    'v-footer': Footer,
  }
}
</script>

<style lang="sass">
  @import "../../assets/sass/base"
  @import "../../assets/sass/common"
</style>
