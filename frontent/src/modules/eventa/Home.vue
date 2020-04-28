<template>
  <div class="event-page-wrapper" v-title data-title="事件分析">
    <div class='search' style="width:100%">
      <v-filter-tab @update:filter="updateFilter"></v-filter-tab>
      <v-search-box :search-input.sync="searchInput"></v-search-box>
      <!-- 注释，单行或多行 -->
    </div>
    <table class="event-table" border="" cellspacing="" cellpadding="" style="width:100%; height: 800px">
            <tr>
                <td style="width:50%; height: 50%">
                  <div id="left_up" ref="myCharts" style="width:100%; height: 100%"></div>
                </td>
                <td style="width:50%; height: 50%">
                  <div id="right_up" ref="myCharts" style="width:100%; height: 100%"></div>
                </td>
            </tr>
            <tr>
                <td style="width:50%; height: 50%">
                  <!-- <div id="left_down" ref="myCharts" style="width:100%; height: 100%"></div> -->
                  <table border="" style="width:100%; height: 100%">
                    <tr style="width:100%; height: 20%">
                      <th colspan="2" style="width:100%; height: 20%; vertical-align: middle !important;text-align: center">
                        专家观点
                      </th>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">观点数量</td>
                      <td style="width:80%; height: 20%">中心观点</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">22</td>
                      <td style="width:80%; height: 20%">外交部：反对以航行自由名损害中国主权和安全</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">12</td>
                      <td style="width:80%; height: 20%">外交部：美方“横行自由才是南海局势紧张根源</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">17</td>
                      <td style="width:80%; height: 20%">美军接连两天在南海动 解放军警告驱离</td>
                    </tr>
                    <tr>
                      <td style="width:20%; height: 20%">26</td>
                      <td style="width:80%; height: 20%">挑衅？美国派军舰连续两天闯中国南岛礁 ，被我军海空兵力警告驱离</td>
                    </tr>
                  </table>
                </td>
                <td style="width:50%; height: 50%">
                    <div class="row main-row" v-title data-title="Ring 事件概览">
                        <div class="col-md-8">
                          <div class="r-panel hotnews-panel">
                            <div class="panel-title-wrapper">
                              <div class="panel-title">
                                <span>事件概览</span>
                                <div class="switch">
                                  <span class="fa"
                                    :class="{
                                      'fa-toggle-on': translated,
                                      'fa-toggle-off': !translated
                                    }"
                                    @click="translated = !translated"></span>
                                  <label class="toggle-label">翻译</label>
                                </div>
                              </div>
                            </div>
                            <div class="events-wrapper">
                              <ul class="event-panel-detail">
                                <li >
                                  <label for="">描&nbsp;&nbsp;&nbsp;述：</label><span class="title">美舰连续两天在南海非法活动</span>
                                </li>
                                <li>
                                  <label for="">参与者：</label><span>美国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <label for="">关键词：</label><span>美国 南海 非法活动</span>
                                </li>
                                <li>
                                  <label for="">类&nbsp;&nbsp;&nbsp;型：</label><span>外国入侵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <label for="">标&nbsp;&nbsp;&nbsp;签：</label><span>外交问题</span><br class="event-br">
                                  <label for="">情&nbsp;&nbsp;&nbsp;绪：</label><span>中性</span>
                                </li>
                                <li>
                                  <label for="">时&nbsp;&nbsp;&nbsp;间：</label><span>2020-04-20 18:20</span><br class="event-br">
                                  <label for="">地&nbsp;&nbsp;&nbsp;点：</label><span>中国南海</span><br class="event-br">
                                  <label for="">来&nbsp;&nbsp;&nbsp;源：</label><span>新华网</span>
                                </li>
                              </ul>
                              <v-desc-view :event="event"></v-desc-view>
                              <!-- <div class="event-panel event-panel-source">
                                <div id="source-timeline" class="event-chart"></div>
                              </div> -->
                            </div>
                          </div>
                        </div>
                    </div>
                    <!-- <div class = 'picture'> -->
                        <!-- <img src="static/image/eventa.png" style="width:100%; height: 100%"> -->
                    <!-- </div> -->
                </td>
            </tr>
      </table>
  <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">

import Colors from 'components/Colors'
// import List from 'components/list/List'
import SearchBox from 'components/search/SearchBox'
import FilterTab from 'components/filtertab/eventa_FilterTab'
import echarts from 'echarts'
import Data from "assets/data/eventa_data.json"
import rdData from "assets/data/eventa_rddata.json"
import Footer from 'components/header/Footer.vue'

export default {
  data () {
    return {
      unique_id: -1,
      sourceMap: {},
      imgUrl: require("../../assets/image/eventa.png"),
      // for timeline
      timeline: {},
      event: {},
      loading: {
        timeline: true,
        source: true,
        words: true,
      },
      translated: false,
      event_source_option: {
        title: {
          name: '数据来源'
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['微博', '微信', '网页', '贴吧'],
        },
        series: [{
          type: 'pie',
          radius: ['50%', '75%'],
          data: [
            {name: '微信', value: 0},
            {name: '网页', value: 0},
            {name: '贴吧', value: 0},
            {name: '微博', value: 0},
          ],
        }, {
          type: 'pie',
          radius: [0, '30%'],
          data: [],
          label: {
            normal: {
              color: ['#250303', '#255025'],
              fontWeight: 'bold',
            },
          },
        }],
      },
      word_cloud_option: {
        title: {
          name: '关键词云'
        },
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          width: '150%',
          height: '150%',
          sizeRange: [16, 36],
          gridSize: 8,
          data: [],
        }],
      },
      Colors: Colors,
      dispDatas: [],
      totalRows: 64,
      pageno: 1,
      options: {
        left_up: { option: {xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }]}},
        right_up: { option: {}, update: () => { return; } },
        left_down: { option: {}, update: () => { return; } },
        right_down: { option: {}, update: () => { return; } },
      },
      searchInput: {
        kws: '',
        dateStart: new Date(), // TODO truncate date to day unit.
        dateEnd: new Date(),
        includeText: false,
      },
      filter: {},
    };
  },
  watch: {
    searchInput: function (input) {
      this.findDatas(this.filter);
    },
    pageno: function (pageno) {
      this.findDatas(this.filter);
    },
    '$route': function (to, from) {
      this.fetchEventSource();
      this.fetchWorldCloud();
      this.makeTimeLine(this.TL);
    },
    translated: function (nendtrans) {
      // 首先判断该Id的源数据存在且可以翻译。
      if (this.sourceMap[this.unique_id] && this.sourceMap[this.unique_id].origin_title) {
        let title = '';
        let content = '';
        if (nendtrans) {
          title = this.sourceMap[this.unique_id].title;
          content = this.sourceMap[this.unique_id].content;
        } else {
          title = this.sourceMap[this.unique_id].origin_title;
          content = this.sourceMap[this.unique_id].origin_content;
          this.translated = false;
        }
        const dom = _.find(this.$el.getElementsByClassName('tl-slide-text-only'), x => x.id === this.unique_id);
        const titleWrapper = dom.getElementsByClassName('tl-headline');
        if (titleWrapper.length > 0) {
          titleWrapper[0].getElementsByTagName('a')[0].innerText = title;
        }
        const contentWrapper = dom.getElementsByClassName('tl-text-content');
        if (contentWrapper.length > 0) {
          contentWrapper[0].getElementsByTagName('p')[0].innerText = content;
        }
      }
    },
    unique_id: id => {
      console.log(id);
    },
  },
  created () {
    this.findDatas();
    // var echarts = require('echarts');
    this.fetchEventSource();
    this.fetchWorldCloud();
  },
  mounted () {
    console.log("123456");
    // this.options.left_up.option = ChartLib.折线图朝鲜.option;
    require(['components/common/TimelineJS/timeline.js'], TL => this.makeTimeLine(TL.default));
    // console.log(this.TL);
    this.event.description = '美舰连续两天在南海非法活动';
    this.event.participant = '美国';
    this.event.corewords = '美国 南海 非法活动';
    this.event.e_type = '外国入侵';
    this.event.toLegacyType = '外国入侵';
    this.event.eventType2 = '外交问题';
    this.event.toManyType = '外交问题';
    this.event.emotion = '中性';
    this.event.toEmotion = '中性';
    this.event.eventSpanDataString = '2020-04-20 18:20';
    this.event.eventLoc = '中国南海';
    this.event.eventFrom = '新华网';
    console.log(this.event);
    var myChart = echarts.init(document.getElementById('left_up'));
    var left_up_option = {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'item',
          formatter: function (param) {
                return param.data.name + ":" + param.data.value;
          }
      },
      legend: {
          data: ['朝鲜','南海','台湾']
      },
      grid: {
          left: '1%',
          right: '1%',
          bottom: '2%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['19.12.1','19.12.2','19.12.3','19.12.4','19.12.5','19.12.6','19.12.7','19.12.8',
          '19.12.9','19.12.10','19.12.11','19.12.12']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '南海',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              // label: {
              //       normal: {
              //         show: true,
              //         position: 'inner',
              //         textStyle: {
              //           fontWeight: 300 ,
              //           fontSize: 16
              //         },
              //         formatter: function (param) {
              //           return param.data.name + ":" + param.data.value;
              //       }
              //     }
              // },
              data: [
                {value: 3755, name: '美方在南海开展“航行自由行动”？'},
                {value: 3511, name: '外交部丨所谓南海航行与飞越自由就是一个伪命题'},
                {value: 3605, name: '英军舰驶近西沙群岛 遭中方护卫舰和直升机驱离'},
                {value: 11859, name: '外交部:反对打着航行自由幌子损害南海'},
                {value: 4635, name: '美军称中国驱逐舰在南海逼近美舰 最近仅45英尺'},
                {value: 63858, name: '国防部回应美军南海“航行自由行动”'},
                {value: 6547, name: '美批准南海"航行自由"计划 印度窃喜:中国会忙翻'},
                {value: 7774, name: '中国驻英大使投书英媒：中国不容美国在南海“秀肌肉”'},
                {value: 3720, name: '美军巡洋舰在西沙群岛附近“航行自由”'},
                {value: 6547, name: '美批准南海"航行自由"计划 印度窃喜:中国会忙翻'},
                {value: 7774, name: '中国驻英大使投书英媒：中国不容美国在南海“秀肌肉”'},
                {value: 3720, name: '美军巡洋舰在西沙群岛附近“航行自由”'}
              ]
          },
      ]
  }
    myChart.setOption(left_up_option);
    // console.log(myChart);
    myChart = echarts.init(document.getElementById('right_up'));
    var ru_data = this.genData(50);
    var right_up_option = {
        title: {
          text: '美军两架B-1B轰炸机与日空自联演后飞越南海上空',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: '70%',
          y: 'center',
          data: ["入侵行动", "国家立场", "防卫行动", "军演行动", "媒体评论", "访问行动"]
        },
        color: ['rgb(203,155,255)', 'rgb(149,162,255)', 'rgb(58,186,255)',
                'rgb(119,168,249)', 'rgb(235,161,159)', 'rgb(200,101,159)'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: '70%',
            center: ['35%', '50%'],
            data: [
              {
                name: "入侵行动",
                value: '10'
              },
              {
                name: "国家立场",
                value: '8'
              },
              {
                name: "防卫行动",
                value: '9'
              },
              {
                name: "军演行动",
                value: '5'
              },
              {
                name: "媒体评论",
                value: '6'
              },
              {
                name: "访问行动",
                value: '4'
              }
            ]
          }
        ]
      };
      myChart.setOption(right_up_option);
  },
  beforeDestroy () {
  },
  methods: {
    genData (count) {
        var nameList = [
            '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
        ];
        var legendData = [];
        var seriesData = [];
        var selected = {};
        var tmpname = null;
        for (var i = 0; i < count; i++) {
            tmpname = Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0)
                : makeWord(2, 1);
            legendData.push(tmpname);
            seriesData.push({
                name: tmpname,
                value: Math.round(Math.random() * 100000)
            });
            selected[tmpname] = i < 6;
        }

        return {
            legendData: legendData,
            seriesData: seriesData,
            selected: selected
        };

        function makeWord (max, min) {
            var nameLen = Math.ceil(Math.random() * max + min);
            var name = [];
            for (var i = 0; i < nameLen; i++) {
                name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
            }
            return name.join('');
        }
    },
    findDatas: function (filter = {
      selectedTypes: [],
      selectedLanguge: '全部',
      selectedLocation: '全部',
      selectedSecu: false,
      selectedWords: [],
    }) {
      // axios.get('/api/cncert/source/findDatas', {params: {
      //   from: this.searchInput.dateStart.format('yyyy-MM-dd'),
      //   to: this.searchInput.dateEnd.format('yyyy-MM-dd'),
      //   kws: this.searchInput.kws,
      //   kws_kinds: _.join(filter.selectedWords, ' '),
      //   include_text: this.searchInput.includeText,
      //   size: 64,
      //   pageno: this.pageno,
      //   sort: filter.selectedSecu ? 'risk' : '', // 如果选中“突发敏感”，搜索时按secu排序，否则按时间排序
      //   types0: _.join(filter.selectedLegacyTypes, ' '),
      //   types2: _.join(filter.selectedTypes, ' '),
      //   language: filter.selectedLanguge,
      //   location: filter.selectedLocation,
      // }}).then(response => {
      //   this.dispDatas = response.data.content;
      //   this.totalRows = response.data.totalElements;
      // });
      this.dispDatas = Data;
      console.log(this.dispDatas);
      this.totalRows = 64;
      console.log(this.totalRows);
    },
    fetchSimNewsById: function (id, callback) {
      // axios.get('/api/cache3/source/fetchSimNewsById', {params: {
      //   id: id,
      // }}).then(response => {
      //   callback(response.data);
      // });
    },
    updateFilter: function (filter) {
      this.filter = filter;
      this.findDatas(filter);
    },
    fetchEventSource () {
      // this.axios.get('/api/getEventSourceCount', {params: {
      //   eventId: this.$route.params.eventId,
      // }}).then(response => {
      //   let data = [
      //     {name: '微信', value: response.data.wechat},
      //     {name: '网页', value: response.data.news},
      //     {name: '贴吧', value: response.data.tieba},
      //   ];
      //   if (response.data.weibo) {
      //     data.push({name: '微博', value: response.data.weibo});
      //   }
      let data = [
          {name: '微信', value: 10},
          {name: '网页', value: 10},
          {name: '贴吧', value: 10},
      ];
      this.event_source_option.series[0].data = _.orderBy(data, 'value', 'desc');
      this.loading.source = false;
      // });
    },
    makeTimeLine (TL) {
      console.log('makeTimeLine');
      this.TL = TL;
      console.log('eventa');
      console.log(TL);
      console.log(this.event);
      // axios.get('/api/getEventSourceById',{params: {
      //   eventId: this.$route.params.eventId,
      //   similarity: true,
      // }}).then(response => {
      //   let sources = {
      //     events: [],
      //   };
      let sources = {events: []};
      var response = rdData;
      console.log(response);
      response.data = _.orderBy(response.data, 'releaseDate');
      let maxSim = 0.0;
      let maxSimIndex = -1;
      if (_.isEmpty(response.data)) { // 如果返回的源数据为空，显示事件本身。
        let date = new Date(this.event.time);
        sources.events = [{
          start_date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            display_date: date.format('yyyy-MM-dd hh:mm:ss'),
          },
          text: {
            headline: '<a href="/event/#/detail/' + this.event.eventId + '" target="_blank">' + this.event.description + '</a>',
            text: '',
          },
          unique_id: this.event.eventId,
        }];
      } else {
        sources.events = _.map(response.data, item => {
          let date = new Date(item.releaseDate);
          let text = item.content;
          if (item.foreign && item.content) {
            text = '<div class="text-content-wrapper">' +
                    '<div class="text-content-inner text-content-left">' + item.origin_content + '</div>' +
                    '<div class="text-content-sep"></div>' +
                    '<div class="text-content-inner text-content-right">' + item.content + '</div>' +
                    '</div>';
          }
          let source = {
            start_date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              hour: date.getHours(),
              minute: date.getMinutes(),
              second: date.getSeconds(),
              display_date: date.format('yyyy-MM-dd hh:mm:ss'),
            },
            text: {
              headline: '<a href="' + item.url + '" target="_blank">' + (item.origin_title || item.title) + '</a>',
              text: text,
            },
            unique_id: item.id,
          };
          // TODO
          // if (item.url) {
          //   let media = {
          //     caption: item.username,
          //     url: item.url,
          //   };
          //   if (item.headPic) {
          //     media.thumbnail = item.headPic;
          //   }
          //   source.media = media;
          // }
          return source;
        });
        this.unique_id = _.last(response.data).id;
        // calculate max similarity index.
        for (var i = 0; i < response.data.length; ++i) {
          if (response.data[i].similarity > maxSim) {
            maxSimIndex = i;
            maxSim = response.data[i].similarity;
          }
        }
      }
      let options = { language: 'zh_CN', start_at_end: true };
      this.timeline = new this.TL.Timeline('source-timeline', sources, options);
      // event binding
      this.timeline.on('change', value => {
        this.unique_id = value.unique_id;
      });
      if (maxSimIndex >= 0) {
        this.timeline.goTo(maxSimIndex);
      }
      // Store source data in map.
      _.each(response.data, item => {
        this.sourceMap[item.id] = item;
      });
      // 外文数据构成比例图
      if (this.event.foreign) {
        let foreignNews = 0;
        let nonforeignNews = 0;
        _.each(response.data, item => {
          if (item.datatag === 'webnews') {
            if (item.foreign) {
              foreignNews += 1;
            } else {
              nonforeignNews += 1;
            }
          }
        });
        this.event_source_option.series[1].data = [
          {name: '外文新闻', value: foreignNews, selected: true},
          {name: '中文新闻', value: nonforeignNews},
        ];
      }
      // });
    },
    fetchWorldCloud () {
      // this.loading.words = true;
      // axios.get('/api/getCorewordsByEventId',{params: {
      //   eventId: this.$route.params.eventId,
      // }}).then(response => {
      //   let words = _.map(response.data.slice(0, 30), item => {
      //     return {name: item.text, value: item.weight * 2};
      //   });
      let words = {name: "456", value: 10};
      this.word_cloud_option.series[0].data = words;
      this.loading.words = false;
      // });
    },
  },
  components: {
    // 'v-list': List,
    'v-search-box': SearchBox,
    'v-filter-tab': FilterTab,
    'v-footer': Footer,
  }
};
</script>

<style lang="sass" >
@import "~assets/sass/mixin"
.real-body
  min-height: 100%
  height: 100%
  display: flex
  flex-direction: column
  .r-header
    flex: 0 0 auto
  .page-wrapper
    flex: 1 0 auto
  .r-footer
    flex: 0 0 auto
</style>

<style lang="sass" scoped>
.event-page-wrapper
  overflow: inherit
  height: auto
.pagination
  margin-bottom: 0rem
  justify-content: center
@media (min-width: 100%)
  .container
    width: 100%
.event-page-wrapper
  width: 100%
  margin: 0px auto 0
  overflow: auto
  background-color: #fff
  padding: 0px 0px
  position: relative
  flex-direction: column
@media (min-width: 100%)
  .event-page-wrapper
    width: 100%
    min-height: 100%
@media (max-width: 100%)
  .event-page-wrapper
    margin-top: 0
.roll-warning-list-move
  transition: transform 1s
</style>

<style type="text/css">
table.event-table
	table{
		border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }
table.event-table
  th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
table.event-table
  td {
    background-color: #f9f9f9;
    min-width: 120px;
    padding: 1px 1px;
  }
table.event-table
  th.active {
    color: #fff;
  }
table.event-table
  th.active .arrow {
    opacity: 1;
  }
table.event-table
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }
table.event-table
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
table.event-table
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>

<style lang="sass" scoped>
@import "~assets/sass/mixin"
.r-panel
  height: 100%
.events-wrapper
  display: flex
  flex-direction: column
  flex: 1
.event-panel
  display: flex
  flex: 1 1 auto
  overflow-y: auto
.event-panel.event-panel-source
  flex: 1 1 0
  height: auto
  overflow-y: hidden
  padding: 0 1.5rem 1rem
  .event-chart
    height: inherit
    display: flex
    flex: 1 1 0
.r-panel
  .event-chart
    display: flex
    flex: 1 1 0
</style>

<style lang="sass">
/*css for timeline.*/
.tl-storyslider
    /*padding: 25px 0 35px*/
.tl-slide
  overflow-y: hidden!important
  .tl-slide-content-container
    .tl-slide-content
      .tl-text
        overflow: hidden
        .tl-headline-date
          font-size: 14px
          margin-bottom: 4px
          color: #999
        h2.tl-headline
          font-size: 24px
          line-height: 28px
          max-height: 56px
          overflow: hidden
          font-weight: bold
          margin-bottom: 8px
          a
            /*color: #414b54*/
            transition: .3s
            &:focus, &:hover
              color: #256bcc
        .tl-text-content
          max-height: 140px
          overflow: hidden
          p
            font-size: 14px
            line-height: 20px
            margin-top: 0
            color: #454545
.tl-storyslider
  .tl-slidenav-title
    display: none!important
  .tl-slidenav-description
    display: none!important
.tl-slidenav-icon
  color: #999!important
  transition: .3s
  &:hover
    color: #454545!important
.text-content-wrapper
  display: flex
  justify-content: space-between
  .text-content-inner
    width: 46%
    display: inline-block
  .text-content-sep
    width: 1px
    border-left: 2px solid
    display: inline-block
</style>
