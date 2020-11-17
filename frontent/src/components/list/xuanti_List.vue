
<template>
  <div class="list-wrapper" ref="TableHeadWrapper">
    <!-- 使用DIV模拟Table布局 -->
    <div class="table list-table-head">
      <div class="table-tr">
        <!-- <div class="table-th td-index">序号</div> -->
        <div class="table-th td-type">内容分类</div>
        <div class="table-th td-title">标题</div>
        <div class="table-th td-date sorting" :class="sortingMap.time" @click="sortValues('time')" :style="sorting === 'time' ? 'color: yellow' : 'color: white'">时间 {{this.sortingMap.time === 'desc'? '↓': '↑'}}</div>
        <div class="table-th td-crisis sorting" @click="sortValues('crisis')" :style="sorting === 'crisis' ? 'color: yellow' : 'color: white'">危机指数 {{this.sortingMap.crisis === 'desc'? '↓': '↑'}}</div>
        <div class="table-th td-believe sorting" @click="sortValues('reliability')" :style="sorting === 'reliability' ? 'color: yellow' : 'color: white'">可靠性 {{this.sortingMap.reliability === 'desc'? '↓': '↑'}}</div>
        <div class="table-th td-source sorting" @click="sortValues('customer')" :style="sorting === 'customer' ? 'color: yellow' : 'color: white'">来源 {{this.sortingMap.customer === 'desc'? '↓': '↑'}}</div>
      </div>
    </div>
    <div class="table table-striped list-table-body" >
        <div class="table-tr" v-for="(item) in dispValues" :key="item.newsid">
          <!-- 正常列表 -->
          <div class="table-tr-row">
            <div class="table-td td-type">{{ item.theme_label }}</div>
            <div class="table-td td-title"
                 @click="viewTrendGraph(item.title, item.content, item.orgs, item.persons, item.title_zh, item.content_zh, item.url)">
              <div class="title-link"
                   v-b-model.modaltrend
                   style="cursor: pointer"
              >{{ item.title }}</div>
            </div>
            <div class="table-td td-date">{{ item.timestr }}</div>
            <div class="table-td td-crisis">{{ item.crisis}}</div>
            <div class="table-td td-believe">{{ item.reliability }}</div>
            <div class="table-td td-source" v-if="!isevent">
              <a :href="item.url">
                {{item.customer}}
              </a>
            </div>
          </div>
          <!-- 更多列表 -->
          <div class="from-source" v-if="toggleSource == item.id" v-for="(subitem, idx) in sourceMore">
            <p class="sub-title"><a :href="subitem.url" target="_blank">{{ subitem.title }}</a></p>
            <p class="sub-date">{{ subitem.timestr }}</p>
            <p class="sub-source">{{ subitem.user }}</p>
            <p class="sub-related"></p>
          </div>
        </div>
    </div>
    <b-modal id="modaltrend" size="lg" :title="this.language!=='中文'? (checked ? viewtitle:viewtitle_zh):viewtitle">
      <div class="switch" style="float:right" v-if="this.language!=='中文'">
                <span class="fa fa-rotate-180"
                      :class="{
                    'fa-toggle-on': checked,
                    'fa-toggle-off': !checked
                  }"
                @click="translate()"></span>
        <label class="toggle-label">原文</label>
      </div>
      <div class="label">
        内容
      </div>
      <div class="chart" style="overflow-y: scroll">
        <!-- <Echarts theme="ring" :resizable="true" :option="trend_option" :loading="loading.trend" :loadingOpts="{ text: '加载中...' }"></Echarts> -->
        {{this.language !== '中文' ?
        (checked ? viewtext:viewtext_zh) : viewtext}}
      </div>
      <div class="label">
        机构
      </div>
      <div class="chart">
        {{orgs}}
      </div>
      <div class="label">
        人员
      </div>
      <div class="chart">
        {{persons}}
      </div>
      <div class="label">
        原文链接
      </div>
      <div class="chart">
        {{url}}
      </div>
      <footer slot="modal-footer"></footer>
    </b-modal>
  </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'
import VBModal from 'bootstrap-vue/es/directives/modal/modal'
Vue.directive('b-model', VBModal);

import Echarts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

import URLSearchParams from 'url-search-params'

export default {
  props: {
    'dispDatas': {
      type: Array,
      default () {
        return [];
      }
    },
    'language': {
      type: String,
      default () {
        return '中文';
      }
    },
    'fetchSimitemsCb': {
      type: Function,
      default () {
        return [];
      }
    },
    'isevent': {
      type: Boolean,
      default () {
        return false;
      }
    },
    'pageno': { // 通过v-model传过来的参数
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      scrolled: false,
      toggleSource: false,
      sourceMore: [],
      viewtitle: '',
      viewtitle_zh: '',
      viewtext: '',
      viewtext_zh: '',
      orgs: '',
      persons: '',
      url: '',
      checked: false,
      loading: { trend: true },
      trend_option: {
        title: {
          text: '热度趋势图',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '热度',
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '热度',
            type: 'line',
            data: [],
          },
        ]
      },
      dispValues: [],
      selectedLanguage: '',
      sorting: 'crisis',
      sortingMap: {'time': 'desc', 'crisis': 'desc', 'customer': 'desc', 'reliability': 'desc'},
    };
  },
  watch: {
    language: function (language) {
      this.selectedLanguage = language
    },
    dispDatas: function (datas) {
      // datas = datas.slice((this.pageno - 1) * 20, this.pageno * 20);
      let xs = _.map(_.uniqBy(datas, 'newsid'), item => {
        // fix the time.
        let s = '' + new Date(item.time).getTime();
        if (_.startsWith(s, '2017')) {
          item.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
        } else {
          if (_.isInteger(item.time)) {
            item.timestr = new Date(item.time).format('yyyy-MM-dd');
          } else {
            item.timestr = new Date(item.time.replace('+0000', 'Z')).format('yyyy-MM-dd');
          }
        }
        return item;
      });
      if (this.sorting) {
        this.dispValues = _.orderBy(xs, this.sorting, this.sortingMap[this.sorting]);
      } else {
        this.dispValues = xs;
      }
    },
  },
  methods: {
    translate () {
      this.checked = !this.checked
    },
    moreSource (item) {
      this.sourceMore = [];
      if (this.toggleSource !== item.id) {
        if (item.sourceMore === undefined) {
          this.fetchSimitemsCb(item.id, more => {
            _.each(more, subitem => {
              let s = '' + new Date(subitem.time).getTime();
              if (_.startsWith(s, '2017')) {
                subitem.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
              } else {
                subitem.timestr = new Date(subitem.time).format('yyyy-MM-dd');
              }
            })
            item.sourceMore = more;
            this.sourceMore = more;
          });
        } else {
          this.sourceMore = item.sourceMore;
        }
        this.toggleSource = item.id;
      } else {
        this.toggleSource = false;
      }
    },
    viewTrendGraph (title, text, orgs, persons, title_zh, text_zh, url) {
      this.checked = false;
      this.viewtitle = title;
      this.viewtitle_zh = title_zh;
      this.loading.trend = true;
      this.viewtext = text;
      this.viewtext_zh = text_zh;
      this.orgs = orgs;
      this.persons = persons;
      this.url = url;
    },
    toggleItem (idx) {
      let item = this.dispValues[idx];
      item.related = !item.related;
      Vue.set(this.dispValues, idx, _.cloneDeep(item));
      this.setFieldValueAs(item.esIndex, item.id, 'type0', 0);
    },
    setFieldValueAs (esIndex, id, field, value) {
      const params = new URLSearchParams();
      params.append('esIndex', esIndex);
      params.append('id', id);
      params.append('field', field);
      params.append('value', value);
      params.append('type', 'int');
      axios.post('/api/cncert/source/setFieldValueAs', params.toString()).then(response => {
        console.log('success: set filed value as ... (' + esIndex + ', ' + id + '), ' + response.data);
      }).catch(error => {
        console.log(error);
      });
    },
    sortValues: function (sorting) {
      this.sorting = sorting;
      if (this.sortingMap[this.sorting]) {
        if (this.sortingMap[this.sorting] === 'asc') {
          this.sortingMap[this.sorting] = 'desc';
        } else {
          this.sortingMap[this.sorting] = 'asc';
        }
      } else {
        let x = {};
        x[this.sorting] = 'desc';
        this.sortingMap = x; // only change the sortingMap once.
      }
      this.dispValues = _.orderBy(this.dispValues, this.sorting, this.sortingMap[this.sorting]);
    },
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    let xs = _.map(_.uniqBy(this.dispDatas, 'newsid'), item => {
      this.dispDatas = this.dispDatas.slice((this.pageno - 1) * 20, this.pageno * 20);
      // fix the time.
      let s = '' + new Date(item.time).getTime();
      if (_.startsWith(s, '2017')) {
        item.timestr = s.substring(4, 6) + '-' + s.substring(6, 8);
      } else {
        if (_.isInteger(item.time)) {
          item.timestr = new Date(item.time).format('MM-dd');
        } else {
          item.timestr = new Date(item.time.replace('+0000', 'Z')).format('MM-dd');
        }
      }

      return item;
    });
    if (this.sorting) {
      this.dispValues = _.orderBy(xs, this.sorting, this.sortingMap[this.sorting]);
    } else {
      this.dispValues = xs;
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    'Echarts': Echarts,
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/common"

// special switch, double-orientated.
.switch
  font-size: 1.6rem
  span.fa
    font-size: 2.0rem
    cursor: pointer
  .fa-toggle-on
    // color: rgba(255, 255, 255, .6)
    color: #2196f3
  .fa-toggle-off
    color: rgba(51, 204, 255, 1)

.form-control
  font-size: 1.6rem
.list-wrapper
  width: 100%
  margin-bottom: 1rem
.list-table-head
  width: 100%
  position: relative
  top: 0
  margin-bottom: 0
  z-index: 99
  white-space: nowrap
  &.tableHeadTop
    position: fixed
  .table-tr
    display: flex
    .table-th
      background-color: #158bdc
      border-bottom: none
      border-top: none
      text-align: center
      color: #fff
      position: relative
      padding: .75rem
      &.td-type
        width: 10%
      &.td-title
        flex: 1
        width: 20%
        text-align: left
      &.td-date
        width: 15%
        text-align: center
        &:before
          left: 7%
        &:after
          right: 10%
      &.sorting
        cursor: pointer
      &.td-crisis
        width: 8%
      &.td-believe
        width: 8%
      &.td-source
        width: 12%
.label
  width: 750px
  margin-bottom: 10px
  font-size: 2rem
  font-family: "Microsoft Yahei"
  font-weight: 700
  border-color: #ddd
.chart
  width: 750px
  max-height: 400px
  min-height: 25px
  margin-bottom: 10px

@media (max-width: 768px)
  .list-table-head
    width: 100%
    &.tableHeadTop
      width: calc(100% - 30px)
  .chart
    width: 100%
    height: 400px
.list-table-body
  &.table-striped tbody tr:nth-of-type(odd)
    background-color: rgba(0, 0, 0, 0.03)
  .table-tr
    &:nth-child(even)
      background-color: #f1f1f1
    .table-tr-row
      display: flex
      .table-td
        padding: .75rem
        text-align: center
        border-top: none
        border-bottom: 1px solid #eceeef
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
        display: inline-block
        // &.td-index
          // width: 5%
        &.td-type
          width: 10%
        &.td-title
          flex: none
          display: flex
          text-align: left
          align-items: center
          width: 47%
          .trend
            flex: none
            width: 18px
            height: 16px
            line-height: 24px
            margin-right: .5rem
            cursor: pointer
            background: url('~assets\\image\\trend_icon.png') no-repeat center
            &.trend_asc
              background-position: 0 0
            &.trend_desc
              background-position: 0 -16px
          .title-link
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        &.td-date
          width: 15%
          text-align: center
        &.td-crisis
          width: 8%
        &.td-believe
          width: 8%
        &.td-source
          width: 12%
          vertical-align: middle
          position: relative
          cursor: pointer
          display: flex
          align-items: center
          justify-content: center
          span
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            margin-right: 2px
            // &:hover
            //   color: #00abff
          .fa
            flex: none
            font-size: 12px
        &.td-feedback
          width: 8%
    .from-source
      display: flex
      background-color: #ebf9ff
      border-bottom: 1px solid #e4e4e4
      p
        padding: .8rem
        margin-bottom: 0
        text-align: center
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        &.sub-title
          text-align: left
          padding-left: 160px
          flex: 1
        &.sub-date
          width: 29%
          text-align: left
        &.sub-source
          width: 10%
        &.sub-related
          width: 8%

a.event-link
  text-decoration: underline
  color: rgba(53, 76, 255, 0.9)

// 移动端隐藏多余表格内容
@media (max-width: 768px)
  .list-table-head
    .table-tr
      .td-index
        width: 14%!important
      .td-date
        text-align: center!important
        width: 18%!important
      .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source, .td-feedback
        display: none
  .list-table-body
    .td-index
      width: 14%!important
    .td-date
      width: 18%!important
    .td-type, .td-emotion, .td-location, .td-sensitive, .td-recommend, .td-source, .td-feedback
      display: none!important
</style>
