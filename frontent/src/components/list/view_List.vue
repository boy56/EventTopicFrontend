<template>
  <div class="list-wrapper" ref="TableHeadWrapper">
    <!-- 使用DIV模拟Table布局 -->
    <div class="table list-table-head" :class="{tableHeadTop:scrolled}" :style="{width: width}">
      <div class="table-tr">
        <!-- <div class="table-th td-index">序号</div> -->
        <div class="table-th td-type">内容分类</div>
        <div class="table-th td-emotion">机构/国家</div>
        <div class="table-th td-pos">职位</div>
        <div class="table-th td-location">专家姓名</div>
        <div class="table-th td-title">观点</div>
        <div class="table-th td-date sorting" :class="sortingMap.time" @click="sortValues('time')">时间 {{this.sortingMap.time === 'desc'? '↓': '↑'}}</div>
        <div class="table-th td-source" v-if='!isevent'>来源</div>
      </div>
    </div>
    <div class="table table-striped list-table-body" >
        <div class="table-tr" v-for="(item) in dispValues" :key="item.viewid">
          <!-- 正常列表 -->
          <div class="table-tr-row">
            <!-- <div class="table-td td-index">{{ idx + 1 }}</div> -->
            <div class="table-td td-type">{{ item.newsinfo.theme }}</div>
            <div class="table-td td-emotion">{{ item.orgname}}</div>
            <div class="table-td td-pos">{{ item.pos}}</div>
            <div class="table-td td-location">{{ item.personname }}</div>
            <!-- <div class="table-td td-type">{{ item.type1 | toMinorType }}</div> -->
            <div class="table-td td-title"
                 v-b-model.modaltrend
                 @click="viewTrendGraph(item.personname + item.verb + item.viewpoint, item.newsinfo.content)"
            >
              <li class="title-link" target="_blank"
                    @mouseenter="enter(item)"
   		              @mouseleave="leave"
   		              @mousemove="updateXY">
                {{ item.verb }}{{ item.viewpoint}}
              </li>
            </div>
            <div class="table-td td-date">{{ item.timestr }}</div>
            <div class="table-td td-source" v-if="!isevent">
              <a :href="item.url">
                {{item.newsinfo.source}}
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
    <b-modal id="modaltrend" size="lg" :title="viewtitle">
      <div class="chart" style="overflow: scroll">
        <!-- <Echarts theme="ring" :resizable="true" :option="trend_option"></Echarts> -->
        {{viewtext}}
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
    }
  },
  data () {
    return {
      scrolled: false,
      toggleSource: false,
      seen: false,
      x: 0,
      y: 0,
      width: '1200px',
      positionStyle: {top: '100px',left: '100px'},
      sourceMore: [],
      viewtitle: '',
      viewtext: '',
      loading: { trend: true },
      trend_option: {
        title: {
          text: this.viewtitle,
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
      sorting: 'time',
      sortingMap: { 'time': 'desc' },
    };
  },
  watch: {
    dispDatas: function (datas) {
      let xs = _.map(_.uniqBy(datas, 'viewid'), item => {
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
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 2) {
        return value.slice(0,2)
      }
      return value
    },
    ellipsisname (value) {
      if (!value) return ''
      if (value.length > 4) {
        return value.slice(0,4)
      }
      return value
    }
  },
  methods: {
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
    viewTrendGraph (title,text) {
      this.viewtitle = title;
      this.loading.trend = true;
      this.viewtext = text;
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
    enter (item) {
      this.seen = true;
    },
    leave: function () {
      this.seen = false;
    },
    updateXY: function (event) {
      this.x = event.pageX;
      this.y = event.pageY;
      this.positionStyle = {top: this.y - 164 + 'px',left: this.x - 374 + 'px'};
    },
  },
  created () {
    let xs = _.map(_.uniqBy(this.dispDatas, 'viewid'), item => {
      // console.log(this.dispDatas)
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
      &.sorting
        cursor: pointer
        /*text-align: left*/
      // &.td-index
        // width: 5%
      &.td-type
        width: 10%
      &.td-title
        flex: 1
        width: 25%
        text-align: left
      &.td-date
        width: 10%
        text-align: center
        &:before
          right: 7%
        &:after
          right: 8%
      &.td-emotion
        width: 10%
      &.td-pos
        width: 10%
      &.td-location
        width: 10%
      // &.td-sensitive
        // width: 7%
      // &.td-recommend
        // width: 6%
      &.td-country_l
        width: 5%
      &.td-source
        width: 15%
      // &.td-feedback
        // width: 8%

.chart
  width: 750px
  height: 400px

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
          flex: 1
          display: flex
          text-align: left
          align-items: center
          cursor: pointer
          .title-link
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        &.td-date
          width: 10%
          text-align: center
        &.td-emotion
          width: 10%
        &.td-pos
          width: 10%
        &.td-location
          width: 10%
        // &.td-sensitive
          // width: 7%
        // &.td-recommend
          // width: 6%
        &.td-country_l
        width: 5%
        &.td-source
          width: 15%
          vertical-align: middle
          position: relative
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
