<template>
  <div id="app" class="real-body">
    <!-- <canvas id="bg"></canvas> -->
    <div class="con-box title">
      <img @click="resetCache" src="~assets/image/title.jpg">
    </div>
    <div :href="'/' + jumpto" class="con-box l-t-box">
    <div class="box light-corner view-core toogle-tab-element">
      <router-link :to="{ name: 'xuanti', params: {id: topic}, query: {queryId: topic}}">
        <div class="view-table start_box box_align pack_center">
              <div class="view-table start_box box_align pack_center">
              <div class="table-item table-item-active  start_box box_align pack_center box-flex"><span class="iconfont icon-yuqing"></span>
              综合选题<span class="unqie-guang"></span></div>
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>朝核<span class="unqie-guang"></span></div> -->
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>综合选题<span class="unqie-guang"></span></div> -->
          </div>
        </div>
      </router-link>
        <div class="view-list-wrapper">
            <div class="view-list tianjin-view-div" id="inner-view-div" style="color: white">
                <ul class="list-item inner-view-list" id="inner-view-list" >
                    <!-- <div class='list-text'>{{v.time.slice(0,10)}}&nbsp;&nbsp;{{v.title}}</div> -->
                    <li class="item box clearfix" v-bind:key=e.title v-for="e in left_up_list" @click='clicking_news(e.views)'>
                      <div class="item-content">
                        <div class="content-top ">
                          <span class="view-type attr-block">{{topic}}</span>
                          <p class="title" :title="e.title">{{e.title}}</p>
                        </div>
                        <div class="content-bt clearfix">
                          <span class="time left"><i class="iconfont icon-clock-o"></i>{{e.timestr}}</span>
                          <span class="from"><i class="iconfont icon-resource"></i>{{e.source}}</span>
                        </div>
                      </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
      <div class="con-box world-map">
          <table style="width:100%">
            <tr>
              <td :style="{color: topic_color1}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('南海')">南海专题(10324)</td>
              <td :style="{color: topic_color2}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('朝核')">朝核专题(20234)</td>
              <td :style="{color: topic_color3}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('台选')">台湾专题(23353)</td>
            </tr>
          </table>
          <Echarts theme="ring" :option="options.worldmap.option" className="chart" style="top:0;bottom:3%"></Echarts>
      </div>
    <div class="con-box r-t-box">
      <!-- <Echarts theme="ring" :option="options.right_up.option" className="chart" ></Echarts> -->
      <div class="box light-corner view-core toogle-tab-element">
        <router-link :to="{name: 'view' ,params: {id: topic}, query: {queryId: topic}}">
        <div class="view-table start_box box_align pack_center">
              <div class="view-table start_box box_align pack_center">
              <div class="table-item table-item-active  start_box box_align pack_center box-flex"><span class="iconfont icon-yuqing"></span>
              专家观点<span class="unqie-guang"></span></div>
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>津外视角<span class="unqie-guang"></span></div> -->
          </div>
        </div>
        </router-link>
        <div class="view-list-wrapper">
              <div class="view-list tianjin-view-div" style="color: white">
                  <ul class="list-item inner-view-list">
                        <!-- <div>{{v.personname}}&nbsp;&nbsp;{{v.verb}}&nbsp;&nbsp;{{v.viewpoint|ellipsis}}</div> -->
                    <li class="item box clearfix" v-bind:key=e.viewpoint v-for="e in right_up_list">
                        <div class="item-content">
                          <div class="content-top ">
                            <span class="view-type attr-block">{{e.country}}</span>
                            <p class="title" style="left: 10%;max-width: 80%;" :title="e.orgname+e.pos+e.personname+e.viewpoint">{{e.verb}}{{e.viewpoint}}</p>
                          </div>
                          <div class="content-bt clearfix">
                            <span style="float:left"><i class="iconfont icon-resource"></i>{{e.orgname}}{{e.pos}}{{e.personname}}</span>
                            <span style="float:right"><i class="iconfont icon-clock-o"></i>{{e.timestr}}</span>
                          </div>
                        </div>
                      </li>
                  </ul>
              </div>
        </div>
    </div>
    </div>
    <div class="con-box l-b-box">
      <div style="text-align: center; margin-bottom: .5rem">
        <span style="font-size: 20px;color:white">热度趋势</span>
      </div>
      <!-- <font size="3" color="white">{{Data.}}</font> -->
      <Echarts theme="ring" :option="options.left_down.option" className="chart" ></Echarts>
    </div>
    <div class="con-box r-b-box">
        <div class="view-core" style='height:18%;overflow:hidden;border-top: 1px solid #052b55;'>
        <router-link :to="{name: 'eventa', params: {id: topic}, query: {queryId: topic}}">
          <div class="view-table start_box box_align pack_center">
                <div class="view-table start_box box_align pack_center">
                <div class="table-item table-item-active  start_box box_align pack_center box-flex" id="inner-view-tab"><span class="iconfont icon-yuqing"></span>
                危机事件<span class="unqie-guang"></span></div>
                <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>津外视角<span class="unqie-guang"></span></div> -->
            </div>
          </div>
        </router-link>
      </div>
        <Echarts theme="ring" ref="hotevent" :option="options.right_down.option" className="chart"></Echarts>
    </div>
     <div class="con-box r-b1-box">
        <div style="text-align: center;margin-bottom: .5rem">
           <span style="font-size: 20px;color: white;">情绪分析</span>
        </div>
        <Echarts theme="ring" :option="options.right1_down.option" className="chart" ></Echarts>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'components/charts/theme/Ring.js'
  import Echarts from 'vue-echarts-v3/src/full.js'
  require('echarts-gl');

  import 'echarts/map/js/world.js';

  import {ChartLib} from './ChartLib.js'

  export default {
    data () {
      return {
        jumpto: '',
        Demo: {},
        topic: null,
        topic_color1: 'red',
        topic_color2: '#00abff',
        topic_color3: '#00abff',
        topics: [1,2,3],
        topic_index: 0,
        intervalID: null,
        intervalRotate: null,
        intervalPop: null,
        result: null,
        nowCityIndex: 0,
        rotateCities: [],
        left_up_list: [],
        right_up_list: [],
        options: {
          left_up: { option: {}, update: () => { } },
          right_up: { option: {}, update: () => { } },
          worldmap: { option: {}, update: () => { } },
          left_down: { option: {}, update: () => { } },
          right_down: { option: {}, update: () => { } },
          right1_down: { option: {}, update: () => { } },
        },
      }
    },
    mounted () {
      if (this.$route.query.queryId) {
        if (this.$route.query.queryId === '南海' || this.$route.query.queryId === '朝核' || this.$route.query.queryId === '台选') {
          this.clicking(this.$route.query.queryId);
        } else {
          this.topic = '南海';
        }
      } else {
        this.topic = '南海';
      }
      this.findDatas();
    },
    filters: {
      ellipsis (value) {
        if (!value) return '';
        if (value.length > 20) {
          return value.slice(0,20) + '...'
        }
        return value
      },
      ellipsisname (value) {
        if (!value) return '';
        if (value.length > 5) {
          return value.slice(0,5) + '...'
        }
        return value
      }
    },
    methods: {
      resetCache: function () {
        axios.get('/api/clear_cathe')
          .then(response => {
            console.log('缓存清除成功！')
            location.reload();
          })
      },
      findDatas: function (filter = {
      }) {
        axios.get('api/search_main', {params: {
          theme: this.topic,
        }}).then(response => {
          this.Demo.news_views_data = response.data.news_views_data;
          this.Demo.hot_data = response.data.hot_data;
          this.Demo.sentiment_data = response.data.sentiment_data;
          this.Demo.event_data = response.data.event_data;
          this.Demo.map_data = response.data.map_data;
        // 事件观点表格
          this.left_up_list = this.Demo.news_views_data;
          for (var i = 0; i < this.left_up_list.length; i++) {
            this.left_up_list[i].timestr = new Date(this.left_up_list[i].time).format('yyyy-MM-dd');
          }
          this.right_up_list = this.left_up_list[0].views;
          for (i = 0; i < this.right_up_list.length; i++) {
            this.right_up_list[i].timestr = new Date(this.right_up_list[i].time).format('yyyy-MM-dd');
          }
        // 热度趋势图
          this.options.left_down.option = ChartLib['折线图南海'].option;
          // this.options.left_down.option.xAxis.data = this.Demo.hot_data.hot_date;
          this.options.left_down.option.series[0].name = this.topic
          this.options.left_down.option.series[0].data = this.Demo.hot_data.data;

        // 情绪分布图
          this.options.right1_down.option = ChartLib['情绪分布图'].option;
          this.options.right1_down.option.xAxis[0].data = this.Demo.sentiment_data.sentiment_date;
        // console.log(this.options.right1_down.option.xAxis.data);
          this.options.right1_down.option.series[0].data = this.Demo.sentiment_data.sentiment_neg;
          this.options.right1_down.option.series[1].data = this.Demo.sentiment_data.sentiment_pos;

        //  热点事件图
          this.options.right_down.option = ChartLib['南海气泡图'].option;
        // console.log(Demo.event_data)
          this.options.right_down.option.legend.data = this.Demo.event_data.legend;
          this.options.right_down.option.series = this.Demo.event_data.series;
          let dataList = [];
          _.each(this.options.right_down.option.series, (value1, index1) => {
            _.each(value1['data'], (value2, index2) => {
              dataList.push([index1, index2])
            });
          });
          clearInterval(this.intervalPop);
          this.intervalPop = setInterval(() => {
            var index = Math.floor((Math.random() * dataList.length));
            this.$refs.hotevent.dispatchAction({
              type: 'showTip',
              seriesIndex: dataList[index][0],
              dataIndex: dataList[index][1],
              position: 'top'
            })
          }, 2000);

          //  世界地图
          this.options.worldmap.option = ChartLib['世界地图'].option;
          this.options.worldmap.option.visualMap.min = this.Demo.map_data.min;
          this.options.worldmap.option.visualMap.max = this.Demo.map_data.max;
          this.options.worldmap.option.series[0].data = this.Demo.map_data.data;
        });
      },
      goto: function () {
        // document.location.href = Common.addr + Common.page1;
      },
      clicking: function (term) {
        this.topic = term;
        if (term === '南海') {
          this.topic_color1 = 'red';
          this.topic_color2 = '#00abff';
          this.topic_color3 = '#00abff';
        } else if (term === '朝核') {
          this.topic_color1 = '#00abff';
          this.topic_color2 = 'red';
          this.topic_color3 = '#00abff';
        } else {
          this.topic_color1 = '#00abff';
          this.topic_color2 = '#00abff';
          this.topic_color3 = 'red';
        }
        this.findDatas();
      },
      clicking_news: function (term) {
        this.right_up_list = term;
        for (var j = 0; j < this.right_up_list.length; j++) {
          this.right_up_list[j].timestr = new Date(this.right_up_list[j].time).format('yyyy-MM-dd');
        }
        this.around(41);
      }
    },
    beforeDestroy () {
      clearInterval(this.intervalPop)
    },
    components: {
      'Echarts': Echarts,
    }
  }
</script>

<style scoped>
  @import "~assets/css/global.css";
  @import "~assets/css/djyun_big_auto.css";
  /* @import "~assets/font-icon/iconfont.css"; */
</style>
<style lang="sass">
  @import "~assets/sass/common"
  .con-box
    // position: absolute
    width: 47%
    height: 50%
    padding: .7rem 1rem .8rem
    background-image: url("~assets/image/box-bg.png")
    background-size: 100% 100%
    z-index: 1000
    cursor: pointer
    &.title
      overflow: hidden
      font-size: 3rem
      width: 97%
      height: 7%
      top: 0
      background-image: none
      padding-top: 0
      text-align: center
    &.l-t-box
      left: 1%
      width: 30%
      top: 7%
    &.world-map
      left: 31%
      overflow: hidden
      width: 38%
      top: 7%
      background-image: none
    &.r-t-box
      right: 1%
      width: 30%
      top: 7%
    &.l-b-box
      overflow: hidden
      left: 1%
      width: 32%
      bottom: 1.2rem
    &.r-b-box
      overflow: hidden
      right: 1%
      width: 32%
      bottom: 1.2rem
    &.r-b1-box
      overflow: hidden
      left: 34%
      width: 32%
      bottom: 1.2rem
      .chart
        bottom: 100rem
        width: 100%
        height: 80%
  .center-box
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 0
    .chart
      width: 100%
      height: 100%
      cursor: pointer
</style>
