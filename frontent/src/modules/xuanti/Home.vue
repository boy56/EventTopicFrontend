<template>
  <div style="background: #f4f4f4">
    <v-header :headdata='headdata'></v-header>
    <div class="xuanti-page-wrapper" v-title data-title="综合推荐">
      <v-filter @update:filter="updateFilter"></v-filter>
      <v-search-box :search-input.sync="searchInput"></v-search-box>
      <v-list :disp-datas="dispDatas"
              :language="selectedLanguge"
              :fetch-simitems-cb="fetchSimNewsById"></v-list>


      <b-pagination align="center" size="md" :limit="8"
                    :per-page="20"
                    :total-rows="totalRows"
                    v-model="pageno">
      </b-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import List from 'components/list/xuanti_List'
import SearchBox from 'components/search/SearchBox'
import Filtertab from 'components/filtertab/xuanti_FilterTab'
import Header from 'components/header/view_Header.vue'

export default {
  data () {
    return {
      headdata: '综合选题',
      topic: null,
      dispDatas: [],
      totalRows: 64,
      selectedLanguge: '中文',
      pageno: 1,
      searchInput: {
        kws: '',
        dateStart: new Date(), // TODO truncate date to day unit.
        dateEnd: new Date(),
        includeText: false,
      },
      filter: {
        selectedTypes: [],
        selectedLanguge: '中文',
        selectedLocation: '全部',
        selectedSecu: false,
        selectedWords: [],
      },
    };
  },
  watch: {
    searchInput: function (input) {
      this.findDatas(this.filter);
    },
    pageno: function (pageno) {
      this.findDatas(this.filter);
    },
  },
  created () {
    this.topic = this.$route.query.queryId;
    this.findDatas();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    findDatas: function (filter = {
      selectedTypes: [],
      selectedLanguge: this.selectedLanguge,
      selectedLocation: '全部',
      selectedSecu: false,
      selectedWords: [],
    }) {
      // axios.get('api/foo', {params: {
      // }}).then(response => {
      //   this.dispDatas = response.data.newsList;
      //   this.dispDatas = this.dispDatas.slice((this.pageno - 1) * 50, this.pageno * 50);
      //   this.totalRows = response.data.totalElements;
      // });
      axios.get('api/search_xuanti', {params: {
        date_from: this.searchInput.dateStart.format('yyyy-MM-dd'),
        date_to: this.searchInput.dateEnd.format('yyyy-MM-dd'),
        kws: this.searchInput.kws,
        kws_kinds: _.join(filter.selectedWords, ' '),
        include_text: this.searchInput.includeText,
        size: 20,
        pageno: this.pageno,
        // sort: filter.selectedSecu ? 'risk' : '', // 如果选中“突发敏感”，搜索时按secu排序，否则按时间排序
        // types0: _.join(filter.selectedLegacyTypes, ' '),
        // types2: _.join(filter.selectedTypes, ' '),
        language: filter.selectedLanguge,
        location: filter.selectedLocation,
        theme: this.topic,  // 需要根据一级页面的专题选项进入二级页面的时候更改
      }}).then(response => {
        this.dispDatas = response.data.newsList;
        // this.dispDatas = this.dispDatas.slice((this.pageno - 1) * 50, this.pageno * 50);
        this.totalRows = response.data.totalElements;
      });
      // this.dispDatas = Demo.newsList;
      // console.log(this.dispDatas);
      // this.dispDatas = this.dispDatas.slice((this.pageno - 1) * 20, this.pageno * 20);
      // this.totalRows = Demo.totalElements;
      // console.log(this.pageno);
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
  },
  components: {
    'v-list': List,
    'v-search-box': SearchBox,
    'v-header': Header,
    'v-filter': Filtertab,
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
.xuanti-page-wrapper
  overflow: inherit
  height: auto
.pagination
  margin-bottom: 0rem
  justify-content: center
@media (min-width: 1200px)
  .container
    width: 1200px
.xuanti-page-wrapper
  width: 100%
  margin: 20px auto 0
  overflow: auto
  background-color: #fff
  padding: 20px 15px
  position: relative
  flex-direction: column
@media (min-width: 1200px)
  .xuanti-page-wrapper
    width: 1200px
    min-height: 525px
@media (max-width: 100%)
  .xuanti-page-wrapper
    margin-top: 0
/*.roll-warning-list-move*/
/*  transition: transform 1s*/
</style>
