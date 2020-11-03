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
  data () {
    return {
      path: 'WS_API_PATH',
      websock: null,
      interval: null,
    }
  },
  components: {
  },
  created () {
    this.initWebSocket();
    this.interval = setInterval(() => {
      console.log(this.websock.readyState)
      if (this.websock.readyState === 3 || this.websock.readyState === 0) {
        this.initWebSocket();
      }
    }, 5000)
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket () { // 初始化weosocket
      this.websock = new WebSocket(this.path);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen () {
      console.log('连接成功');
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage (e) { // 数据接收
      console.log(e.data);
      let question = e.data;
      let theme = '';
      let content = '';
      let lang = '中文';
      let nextPath = '';
      // let year = new Date().format('yyyy');
      // let month = new Date().format('MM');
      let startTime = '';
      let endTime = '';
      axios.get('VOICE_API_PATH', {params: {
        command: question
      }}.then(response => {
        try {
          startTime = response.data().data.Time[0]
        } catch (e) {
          console.log(e);
        }
        try {
          endTime = response.data().data.Time[1]
        } catch (e) {
          console.log(e);
        }
      }).error(e => {
        console.log(e);
      }))
      if (question.indexOf('南') !== -1) {
        theme = '南海';
      } else if (question.indexOf('朝') !== -1) {
        theme = '朝核';
      } else if (question.indexOf('台') !== -1) {
        theme = '台选';
      }

      if (question.indexOf('新闻') !== -1) {
        content = '新闻';
        nextPath = '/xuanti';
      } else if (question.indexOf('观点') !== -1) {
        content = '观点';
        nextPath = '/view';
      } else if (question.indexOf('预测') !== -1) {
        content = '预测';
        nextPath = '/eventa';
      } else if (question.indexOf('返回主页') !== -1) {
        nextPath = '/';
      } else {
        content = '分析';
        nextPath = '/'
      }

      if (question.indexOf('英文') !== -1 || question.indexOf('英语') !== -1) {
        lang = '英文';
      } else if (question.indexOf('日文') !== -1 || question.indexOf('日语') !== -1) {
        lang = '日文';
      } else if (question.indexOf('韩文') !== -1 || question.indexOf('韩文') !== -1) {
        lang = '韩文';
      } else {
        lang = '中文';
      }

      let data = JSON.stringify({'question': e.data, 'answer': '以下是' + theme + '专题的相关' + (lang !== '中文' ? lang : '') + content + '内容'});
      this.websock.send(data);
      if (theme !== '') {
        this.$router.push({
          path: nextPath,
          query: {
            queryId: theme,
            lang: lang,
            startDate: startTime,
            endDate: endTime,
          }
        })
      }
    },
    websocketclose (e) {  // 关闭
      console.log('断开连接',e);
    },
  },
  watch: {
    '$route': function (to, from) {
      this.$route.back(0)
    },
  }
}
</script>

<style lang="sass">
  @import "../assets/sass/common"
</style>
