<template>
  <!-- <div id="app" class="real-body"> -->
    <!--通过vue-router控制主内容区域变换-->    
  <router-view></router-view>
  <!-- </div> -->
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'

// Require custom echarts theme.

/* Globally bus for Non Parent-Child Communication */
window.bus = new Vue();

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="sass">
  @import "../assets/sass/base"
  @import "../assets/sass/common"
</style>
