<template>
  <div style="background: #f4f4f4">
    <v-header :headdata='headdata' :topic="topic"></v-header>
    <div class="page-wrapper" v-title data-title="事件分析">
      <!-- <v-filter-tab @update:filter="updateFilter"></v-filter-tab> -->
      <v-search-box :search-input.sync="searchInput" :search-time="loadingTime" :predict-events="predict_events"></v-search-box>
      <div class="row" :style="chartStyle">
        <div class="col-8">
          <div id="left_up" ref="myCharts" style="width:100%; height: 100%; padding: 10px"></div>
        </div>
        <div class="col-4">
          <div id="right_up" ref="myCharts" style="width:100%; height: 80%; top: 10%; padding: 10px 0"></div>
          <div style="text-align: center">{{ searchInput.predictEvent }}</div>
        </div>
      </div>
      <div style="text-align: center;font-size: 20px; background: #03c9a9;font-family: 'SimHei'; font-weight: 700; margin-top: 5px; margin-bottom: 15px">支撑材料</div>
      <div class="row">
        <div class="col-6">
          <div class="news-card-list" :style="supportStyle">
            <div class="news-card" v-for="news in nextevent_news" :key="news.title">
              <div class="news-card_title" v-html="news.title"></div>
              <div class="news-card_crisis">{{ news.crisis }}</div>
              <div class="news-card_source">{{ news.source }}</div>
              <div class="news-card_time">{{ news.time }}</div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="views-card-list" :style="supportStyle">
            <div class="views-card" v-for="view in nextevent_views" :key="view.title">
              <div class="views-card_fire"><img src="~assets/image/fire.png" :style="'height:20px; margin-top: -20px;opacity: '+ parseFloat(view.weight)/10 "></div>
              <div class="views-card_org" v-html="view.org" :title="view.org"></div>
              <div class="views-card_viewpoint" :title="view.viewpoint">{{ view.viewpoint }}</div>
              <div class="views-card_time">{{ view.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="r-panel">
        <div class="events-wrapper">
          <div style="text-align: center;font-size: 20px; background: #03c9a9;font-family: 'SimHei'; font-weight: 700; margin-top: 20px">事件追溯</div>
          <div class="event-panel event-panel-source">
            <div id="source-timeline" class="event-chart" :style="timelineStyle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'components/search/Eventa_SearchBox'
import echarts from 'echarts'
import Header from 'components/header/view_Header.vue'
import {ChartLib} from '../ChartLib.js'

require('components/common/TimelineJS/timeline.css')
export default {
  // props: {
  //   event: {
  //     type: Object,
  //   },
  // },
  data () {
    return {
      headdata: '事件预测',
      unique_id: -1,
      sourceMap: {},
      left_down_data: [],
      nextevent_content: '',
      topic: null,
      Demo: null,
      loadingTime: 0.795,
      imgUrl: require('../../assets/image/eventa.png'),
      // for timeline
      timeline: {},
      tableStyle: {
        width: '100%',
        height: '800px',
      },
      timelineStyle: {
        height: '300px',
      },
      chartStyle: {
        height: '500px',
        paddingTop: '1rem'
      },
      supportStyle: {
        height: '300px',
      },
      event: [],
      predict_events: [],
      // events: [],
      loading: {
        timeline: true,
        source: true,
        words: true,
      },
      translated: false,
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
        predictEvent: '美国进行南海航行自由行动',
        dateStart: new Date('2019-11-12'), // TODO truncate date to day unit.
        dateEnd: new Date('2020-11-12'),
        includeText: false,
      },
      selected_result: '',
      filter: {},
      legendData: [],
      nextevent_news: [],
      nextevent_views: [],
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
      this.newmakeTimeLine(this.TL);
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
    selected_result: function () {
      this.nextevent_news = this.Demo.nextevent_news_pro
      this.nextevent_views = this.Demo.nextevent_views_pro
    }
  },
  created () {
    this.topic = this.$route.query.queryId;
    if (this.topic === '南海') {
      this.predict_events = ['美国进行南海航行自由行动', '美国发布挑衅南海主权和权益言论'];
      this.searchInput.predictEvent = this.predict_events[0]
    } else if (this.topic === '朝核') {
      this.predict_events = ['朝鲜采取军事行动等过激行为', '西方国家针对朝鲜进行制裁'];
      this.searchInput.predictEvent = this.predict_events[0]
    } else if (this.topic === '台选') {
      this.predict_events = ['台湾政局核心人物鼓吹台独', '台湾政局发生大规模人事变化'];
      this.searchInput.predictEvent = this.predict_events[0]
    } else if (this.topic === '预演') {
      this.predict_events = ['美国对南海岛礁进行军事打击', '台湾对美军南海战略进行响应', '美国军舰在南海进行游弋', '其他国家对南海进行军事入侵活动'];
      this.searchInput.predictEvent = this.predict_events[0]
    }
    if (this.$route.query.startDate) {
      this.searchInput.dateStart = new Date(this.$route.query.startDate);
    }
    if (this.$route.query.endDate) {
      this.searchInput.dateEnd = new Date(this.$route.query.endDate);
    }
    if (this.topic === '预演') {
      this.searchInput.dateStart = new Date('2022-08-22')
      this.searchInput.dateEnd = new Date('2022-08-22')
    }
    window.addEventListener('resize', this.getHeight);
    this.getHeight();
  },
  mounted () {
    this.findDatas();
  },
  beforeDestroy () {
  },
  methods: {
    getHeight () {
      this.tableStyle.height = (window.innerHeight - 159.5) + 'px'
      this.chartStyle.height = (window.innerHeight - 173.5) * 0.6 + 'px'
      this.timelineStyle.height = (window.innerHeight - 173.5) * 0.6 + 'px'
      this.supportStyle.height = (window.innerHeight - 173.5) * 0.45 - 74 + 'px'
    },
    sendReport () {
      axios.post('REPORT_API_PATH', {
        data: this.Demo.report_data
      }).then(response => {
        console.log(response)
      }).error(e => {
        console.log(e)
      })
    },
    findDatas: function (filter = {
      selectedTypes: [],
      selectedLanguge: '全部',
      selectedLocation: '全部',
      selectedSecu: false,
      selectedWords: [],
    }) {
      let startTime = Date.now();
      axios.get('api/search_eventa', {params: {
        date_from: this.searchInput.dateStart.format('yyyy-MM-dd'),
        date_to: this.searchInput.dateEnd.format('yyyy-MM-dd'),
        predict_event: this.searchInput.predictEvent,
        theme: this.topic,  // 需要根据一级页面的专题选项进入二级页面的时候更改
      }}).then(response => {
        this.Demo = response.data;
        require(['../../components/common/TimelineJS/timeline.js'], TL => this.newmakeTimeLine(TL.default));
        var myChart = echarts.init(document.getElementById('left_up'));
        var left_up_option = JSON.parse(JSON.stringify(ChartLib['事件图谱'].option));
        var nodelist = [];
        _.forEach(this.Demo.graph_data.nodelist, (item) => {
          console.log(item.name)
          if (item.category !== 0 && item.category !== 4) {
            item.itemStyle = {
              normal: {
                label: {
                  show: true
                }
              }
            };
            nodelist.push(item)
          } else {
            nodelist.push(item)
          }
        });
        left_up_option.legend = {
          data: this.Demo.graph_data.categories
        };
        left_up_option.series[0].data = nodelist;
        left_up_option.series[0].links = this.Demo.graph_data.linklist;
        left_up_option.series[0].categories = this.Demo.graph_data.categories;
        left_up_option.series[0].zoom = 2;
        myChart.setOption(left_up_option);
        myChart = echarts.init(document.getElementById('right_up'));
        this.nextevent_news = this.Demo.nextevent_news_pro;
        this.nextevent_views = this.Demo.nextevent_views_pro;
        this.nextevent_content = this.Demo.nextevent_content;
        var right_up_option = {
          title: {
            text: '事件预测',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [{
            name: this.searchInput.predictEvent,
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 28
            },
            title: {
              fontSize: 14
            },
            center: ['50%', '50%'],
            data: [{
              value: (this.Demo.nextevent_weight * 100).toFixed(0),
              name: '发生概率'
            }]
          }]
        };
        // var right_up_option = {
        //   title: {
        //     text: '事件预测',
        //     subtext: '',
        //     x: 'center'
        //   },
        //   tooltip: {
        //     trigger: 'item',
        //     formatter: function (params) {
        //       let news = _.join(params.data.news.slice(0, params.percent / 10 + 1), ' <br/>')
        //       return '后续事件：<br/>' + params.data.name + '(' + params.percent + '%) <br/>事件描述：<br/>' + params.data.name_content + '<br/>相关新闻：<br/>' + news
        //     }
        //   },
        //   legend: {
        //     orient: 'vertical',
        //     left: '70%',
        //     y: 'center',
        //     data: this.Demo.eventpre_data.legend_data
        //   },
        //   color: ['rgb(203,155,255)', 'rgb(149,162,255)', 'rgb(58,186,255)',
        //     'rgb(119,168,249)', 'rgb(235,161,159)', 'rgb(200,101,159)'],
        //   series: [
        //     {
        //       name: '事件预测',
        //       type: 'pie',
        //       radius: '60%',
        //       center: ['40%', '50%'],
        //       data: this.Demo.eventpre_data.data
        //     }
        //   ]
        // };
        myChart.setOption(right_up_option);
        // this.left_down_data = this.Demo.view_cluster_data.slice(0, Math.floor(((window.innerHeight - 159.5) * 0.5 - 60) / 40));
        this.left_down_data = this.Demo.nextevent_views;
        this.loadingTime = (Date.now() - startTime) / 1000;
      });
    },
    fetchSimNewsById: function (id, callback) {
      axios.get('/api/cache3/source/fetchSimNewsById', {params: {
        id: id,
      }}).then(response => {
        callback(response.data);
      });
    },
    updateFilter: function (filter) {
      this.filter = filter;
      this.findDatas(filter);
    },
    newmakeTimeLine (TL) {
      var sources = {events: []};
      var response = this.Demo.nextevent_timeline_data;
      this.TL = TL;
      response = _.orderBy(response, 'releaseDate');
      let maxSimIndex = -1;
      sources.events = _.map(response, item => {
        let date = new Date(item.dateDay);
        let text = item.content;
        if (item.foreign && item.content) {
          text = '<div class="text-content-wrapper">' +
                  '<div class="text-content-inner text-content-left">' + item.content + '</div>' +
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
            headline: '<a href="' + item.url + '" target="_blank">' + (item.title) + '</a>',
            text: text,
          },
          unique_id: item.id,
        };
        return source;
      });
      this.unique_id = _.last(response).id;
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
      if (this.translated) {
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
    },
  },
  components: {
    'v-search-box': SearchBox,
    'v-header': Header,
  }
};
</script>

<style lang="sass" >
@import "~assets/sass/mixin"
.con-box
  position: absolute
  width: 37%
  height: 45%
  padding: .7rem 1rem .8rem
  // background-image: url("~assets/images/box-bg.png")
  background-size: 100% 100%
  z-index: 1000
  cursor: pointer
  &.l-t-box
  &.r-t-box
  &.l-b-box
  &.r-b-box
    .chart
      bottom: 100rem
      width: 100%
      height: 80%
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
.page-wrapper
  overflow: inherit
  height: auto
.pagination
  margin-bottom: 1.5rem
  justify-content: center
@media (min-width: 1200px)
  .container
    width: 1200px
.page-wrapper
  width: 100%
  margin: 20px auto 0
  overflow: auto
  background-color: #fff
  padding: 20px 15px
  // position: relative
  flex-direction: column
@media (min-width: 1200px)
  .page-wrapper
    width: 1200px
    min-height: 525px
@media (max-width: 768px)
  .page-wrapper
    margin-top: 0
// .roll-warning-list-move
//   transition: transform 1s
</style>

<style lang="sass" scoped>
.r-panel
  height: 100%
  margin-top: 1rem
.events-wrapper
  display: flex
  flex-direction: column
  flex: 1
.event-panel
  display: flex
  flex: 1 1 auto
  overflow-y: auto
.event-panel.event-panel-source
  flex: 1 1 auto
  height: auto
  overflow-y: auto
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

<style type="text/css">
	table2 {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
td {
  background-color: #f9f9f9;
}
th,
td {
  min-width: 120px;
  padding: 5px 1px;
}
th.active {
  color: #fff;
}
th.active .arrow {
  opacity: 1;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
<style lang="sass">
.event-br
  display: none
@media (max-width: 768px)
  .event-br
    display: block
  .event-panel-detail
    li
      span
        min-width: 0
.event-panel-detail
  flex-direction: column
  padding: 1rem 0 .2rem
  margin: 0 1.5rem 1.2rem
  border-bottom: 1px solid #dddddd
  overflow-y: auto
  li
    &:first-child
      white-space: nowrap
      overflow: hidden
    label
      margin-bottom: .8rem
      color: #787878
    span
      margin-bottom: .8rem
      color: #333
      display: inline-block
      min-width: 22rem
      padding-right: 3rem
      &.title
        font-size: 1.5rem
        font-weight: bold
@media (max-width: 1440px)
  .event-panel-detail
    li
      span
        min-width: 13rem
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
/* Timeline里面外文/中文内容并排显示 */
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

.result-group
  text-align: center
  margin: 10px
  font-size: 16px
  font-weight: 700

  .result
    margin: 0 10px

.news-card-list
  overflow-y: scroll
  padding: 12px

  .news-card
    padding: 5px
    margin-bottom: 5px
    border: 2px solid #0a7ac9
    border-radius: 4px
    height: 98px

    .news-card_title
      display: inline-block
      width: 90%
      height: 60px
      font-weight: 700
      font-size: 20px

    .news-card_crisis
      color: red
      display: inline-block
      float: right
      font-weight: 700
      font-size: 20px

    .news-card_source
      display: inline-block
    .news-card_time
      float: right
      color: #333333

.views-card-list
  overflow-y: scroll
  padding: 12px

  .views-card
    padding: 0 8px
    border: 2px solid #0a7ac9
    border-radius: 4px
    margin-bottom: 4px
    height: 110px

  .views-card_fire
    height: 24px
    display: inline-block

  .views-card_org
    display: inline-block
    font-size: 20px
    vertical-align: center
    overflow: hidden
    text-overflow: ellipsis
    width: 480px
    white-space: nowrap

  .views-card_viewpoint
    height: 48px
    overflow: hidden

  .views-card_time
    float: right

</style>

