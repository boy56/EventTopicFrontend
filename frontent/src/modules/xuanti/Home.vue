<template>
  <div class="xuanti-page-wrapper" v-title data-title="综合推荐">
    <v-filter-tab @update:filter="updateFilter"></v-filter-tab>
     <v-search-box :search-input.sync="searchInput"></v-search-box>
    <v-list :disp-datas="dispDatas"
            :fetch-simitems-cb="fetchSimNewsById"></v-list>


    <b-pagination align="center" size="md" :limit="8"
                 :per-page="64"
                 :total-rows="totalRows"
                 v-model="pageno">
    </b-pagination>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">

import Colors from 'components/Colors'
import List from 'components/list/xuanti_List'
import SearchBox from 'components/search/SearchBox'
import FilterTab from 'components/filtertab/xuanti_FilterTab'
import Data from 'assets/data/xuanti_data.json'
import Footer from 'components/header/Footer.vue'
// import Header from 'components\\header\\xuanti_Header.vue'

export default {
  data () {
    return {
      Colors: Colors,
      dispDatas: [],
      totalRows: 64,
      pageno: 1,
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
  },
  created () {
    this.findDatas();
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
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
      this.totalRows = 1;
      console.log(this.totalRows);
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
      console.log("ningyxff");
    },
  },
  components: {
    'v-list': List,
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
.xuanti-page-wrapper
  overflow: inherit
  height: auto
.pagination
  margin-bottom: 0rem
  justify-content: center
@media (min-width: 100%)
  .container
    width: 100%
.xuanti-page-wrapper
  width: 100%
  margin: 0px auto 0
  overflow: auto
  background-color: #fff
  padding: 0px 0px
  position: relative
  flex-direction: column
@media (min-width: 100%)
  .xuanti-page-wrapper
    width: 100%
    min-height: 100%
@media (max-width: 100%)
  .xuanti-page-wrapper
    margin-top: 0
.roll-warning-list-move
  transition: transform 1s
</style>
