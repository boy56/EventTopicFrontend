<template>
  <div class="page-wrapper" v-title data-title="事件分析">
    <v-header :headdata='headdata'></v-header>
    <!-- <v-filter-tab @update:filter="updateFilter"></v-filter-tab> -->
    <v-search-box :search-input.sync="searchInput"></v-search-box>
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
                   <tr v-bind:key='item' v-for='item in left_down_data'>
                      <td style="width:20%; height: 20%">{{item.view_num}}</td>
                      <td style="width:80%; height: 20%">{{item.center}}</td>
                    </tr>
                  </table>
                </td>
                <td style="width:50%; height: 50%">
                  <div class="r-panel">
                    <div class="events-wrapper">
                      <!-- <ul class="event-panel-detail">
                        <li >
                          <label for="">描&nbsp;&nbsp;&nbsp;述：</label><span class="title">{{ event.description && event.description.trim() }}</span>
                        </li>
                        <li>
                          <label for="">参与者：</label><span>{{ event.participant }}</span><br class="event-br">
                          <label for="">关键词：</label><span>{{ event.corewords }}</span>
                        </li>
                        <li>
                          <label for="">类&nbsp;&nbsp;&nbsp;型：</label><span>{{ event.e_type}}</span><br class="event-br">
                          <label for="">标&nbsp;&nbsp;&nbsp;签：</label><span>{{ event.eventType2}}</span><br class="event-br">
                          <label for="">情&nbsp;&nbsp;&nbsp;绪：</label><span>{{ event.emotion}}</span>
                        </li>
                        <li>
                          <label for="">时&nbsp;&nbsp;&nbsp;间：</label><span>{{ event.eventSpanDateString }}</span><br class="event-br">
                          <label for="">地&nbsp;&nbsp;&nbsp;点：</label><span>{{ event.eventLoc }}</span><br class="event-br">
                          <label for="">来&nbsp;&nbsp;&nbsp;源：</label><span>{{ event | eventFrom }}</span>
                        </li>
                      </ul> -->
                      <div class="event-panel event-panel-source">
                        <div id="source-timeline" class="event-chart"></div>
                      </div>
                    </div>
                  </div>
                </td>
            </tr>
      </table>
      <v-footer></v-footer>
    <!-- </iframe> -->
    <!-- <b-pagination align="center" size="md" :limit="8"
                 :per-page="64"
                 :total-rows="totalRows"
                 v-model="pageno"> -->
    <!-- </b-pagination> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Colors from 'components/Colors'
import SearchBox from 'components/search/SearchBox'
import FilterTab from 'components/filtertab/eventa_FilterTab'
import echarts from 'echarts'
import Data from 'assets/data/eventa_data.json'
import Demo from 'assets/data/eventa_demo.json'
// import rdData from 'assets/data/eventa_rddata.json'
import Footer from 'components/header/Footer.vue'
import Header from 'components/header/view_Header.vue'
// import TL from 'components/common/TimelineJS/timeline.js'
require('components/common/TimelineJS/timeline.css')
export default {
  // props: {
  //   event: {
  //     type: Object,
  //   },
  // },
  data () {
    return {
      headdata: "事件分析",
      unique_id: -1,
      sourceMap: {},
      left_down_data: [],
      topic: null,
      // Demo: null,
      imgUrl: require('../../assets/image/eventa.png'),
      // for timeline
      timeline: {},
      event: [],
      // events: [],
      loading: {
        timeline: true,
        source: true,
        words: true,
      },
      translated: false,
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
    unique_id: id => {
      console.log(id);
    },
  },
  created () {
    this.topic = this.$route.params.topic;
    this.findDatas();
    // var echarts = require('echarts');
  },
  mounted () {
    require(['components/common/TimelineJS/timeline.js'], TL => this.newmakeTimeLine(TL.default));
    console.log('123456');
    // this.options.left_up.option = ChartLib.折线图朝鲜.option;
    // this.event = Demo.data[0];
    console.log(this.timeline);
    console.log(this.event);
    // console.log(sources);
    var myChart = echarts.init(document.getElementById('left_up'));
    var left_up_option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: function (param) {
          return param.data.name + ':' + param.data.value;
        }
      },
      legend: {
        // data: ['朝鲜','南海','台湾']
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Demo.tendency_data.tendency_time
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
          data: Demo.tendency_data.tendency_news
        },
      ]
    }
    myChart.setOption(left_up_option);
    // console.log(myChart);
    myChart = echarts.init(document.getElementById('right_up'));
    // var ru_data = this.genData(50);
    var right_up_option = {
      title: {
        text: '美军两架B-1B轰炸机与日空自联演后飞越南海上空',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '70%',
        y: 'center',
        data: Demo.eventpre_data.legend_data
      },
      color: ['rgb(203,155,255)', 'rgb(149,162,255)', 'rgb(58,186,255)',
        'rgb(119,168,249)', 'rgb(235,161,159)', 'rgb(200,101,159)'],
      series: [
        {
          name: '',
          type: 'pie',
          radius: '70%',
          center: ['35%', '50%'],
          data: Demo.eventpre_data.data
        }
      ]
    };
    myChart.setOption(right_up_option);
    this.left_down_data = Demo.view_cluster_data;
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
      axios.get('/api/search_eventa', {params: {
        date_from: this.searchInput.dateStart.format('yyyy-MM-dd'),
        date_to: this.searchInput.dateEnd.format('yyyy-MM-dd'),
        kws: this.searchInput.kws,
        kws_kinds: _.join(filter.selectedWords, ' '),
        include_text: this.searchInput.includeText,
        size: 64,
        pageno: this.pageno,
        // sort: filter.selectedSecu ? 'risk' : '', // 如果选中“突发敏感”，搜索时按secu排序，否则按时间排序
        // types0: _.join(filter.selectedLegacyTypes, ' '),
        // types2: _.join(filter.selectedTypes, ' '),
        language: filter.selectedLanguge,
        location: filter.selectedLocation,
        theme: this.topic,  // 需要根据一级页面的专题选项进入二级页面的时候更改
      }}).then(response => {
        this.Demo = response.data
        // this.dispDatas = this.dispDatas.slice((this.pageno - 1) * 50, this.pageno * 50);
        this.totalRows = response.data.totalElements;
      });
      // this.dispDatas = Data;
      // console.log(this.dispDatas);
      // this.totalRows = 64;
      // console.log(this.totalRows);
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
      var response = Demo.timeline_data;
      this.TL = TL;
      console.log(response);
      response.data = _.orderBy(response.data, 'releaseDate');
      console.log(response.data);
      let maxSim = 0.0;
      let maxSimIndex = -1;
      if (_.isEmpty(response.data)) { // 如果返回的源数据为空，显示事件本身。
        console.log('isEmpty');
        let date = new Date(this.event.dateDay);
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
        console.log('noEmpty');
        sources.events = _.map(response.data, item => {
          let date = new Date(item.dateDay);
          let text = item.content;
          console.log(text);
          if (item.foreign && item.content) {
            console.log('foreign');
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
        console.log(sources);
        this.unique_id = _.last(response.data).id;
        // calculate max similarity index.
        console.log(this.unique_id);
        // for (var i = 0; i < response.data.length; ++i) {
        //   if (response.data[i].similarity > maxSim) {
        //     maxSimIndex = i;
        //     maxSim = response.data[i].similarity;
        //   }
        // }
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
    'v-filter-tab': FilterTab,
    'v-header': Header,
    'v-footer': Footer,
  }
};
</script>

<style lang="sass" >
@import "~assets/sass/mixin"
.con-box
  position: absolute
  width: 37%
  height: 45%
  overflow: scroll
  padding: .7rem 1rem .8rem
  // background-image: url("~assets/images/box-bg.png")
  background-size: 100% 100%
  z-index: 1000
  cursor: pointer
  &.l-t-box
    left: 1.5rem
    top: 1.2rem
  &.r-t-box
    right: 1.5rem
    top: 1.2rem
  &.l-b-box
    left: 1.5rem
    bottom: 1.2rem
  &.r-b-box
    right: 1.5rem
    bottom: 1.2rem
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
// @media (min-width: 1200px)
//   .page-wrapper
//     width: 1200px
//     min-height: 525px
// @media (max-width: 768px)
//   .page-wrapper
//     margin-top: 0
// .roll-warning-list-move
//   transition: transform 1s
</style>

<style lang="sass" scoped>
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
  padding: 1px 1px;
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
    padding: 25px 0 35px
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
</style>

