<template>
  <div class="search-row row form-horizontal">
    <div class="col-md-3 date-wrapper">
      <select v-model="searchInput.predictEvent" style="font-size: 16px">
        <option v-for="event in predictEvents" :value="event" style="font-size: 16px">{{ event }}</option>
      </select>
    </div>
    <div class="col-md-3 date-wrapper">
      <label for="date-end" class="control-label date-label">预测时间：</label>
      <v-datepicker placeholder="选择日期" :value="searchInput.dateEnd" :disabled="dateEndStart"  @selected="v => searchInput.dateEnd = v"></v-datepicker>
    </div>
    <div class="col-md-2 search-btns">
      <!-- 以下提交按钮在PC端显示 -->
      <button class="search-title btn" @click="searchTitle">搜索</button>
      <!-- <button class="search-title-cont btn" @click="searchTitleText">搜标题+正文</button> -->
    </div>
    <div class="col-md-2" style="padding: 6px">
      <div>搜索用时：{{searchTime}}秒</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Datepicker from 'components/datepicker/Datepicker'

  export default {
    props: {
      searchInput: {
        type: Object,
        default () {
          return {
            predictEvent: '',
            dateStart: new Date().format('yyyy-MM-dd'),
            dateEnd: new Date().format('yyyy-MM-dd'),
            includeText: false,
          };
        }
      },
      searchTime: {
        type: Number,
        default: 0.754
      },
      predictEvents: {
        type: Array,
        default () {
          return ['美国进行南海航行自由行动', '美国发布挑衅南海主权和权益言论'];
        }
      }
    },
    data () {
      return {
      };
    },
    computed: {
      dateStartEnd () {
        return { from: this.searchInput.dateEnd };
      },
      dateEndStart () {
        return { from: new Date(), to: this.searchInput.dateStart };
      },
    },
    methods: {
      searchTitle: function () {
        this.searchInput.includeText = false;
        this.$emit('update:searchInput', _.cloneDeep(this.searchInput));
      },
      searchTitleText: function () {
        this.searchInput.includeText = true;
        this.$emit('update:searchInput', _.cloneDeep(this.searchInput));
      },
    },
    components: {
      'v-datepicker': Datepicker,
    }
  }
</script>

<style lang="sass" scoped>
.form-control
  font-size: 1.6rem
  line-height: 1.5rem
.search-row
  margin-bottom: 10px
  .search-wrapper
    position: relative
    .search-submit
      display: none
  .search-ipt
    height: 100%
  .date-wrapper
    font-size: 1.0rem
    display: flex
    justify-content: space-around
    label
      display: inline-block
      width: 28%
      font-size: 1.6rem
      padding: 7px 0 0 0px
      margin-bottom: 0
  .search-btns
    display: flex
    justify-content: space-between
    button
      color: #fff
      font-size: 1.6rem
      margin-left: 10px
      background-color: #158bdc
      cursor: pointer
      &:hover
        background-color: #0a7ac9

@media (min-width:768px)
  .search-row
    .search-wrapper
      flex: 0 0 16%
    .date-wrapper
      flex: 0 0 33%
      max-width: 33%

@media (max-width:768px)
  .search-row
    .date-wrapper
      display: none
    .search-wrapper
      height: 25px
      .search-submit
        display: block
        position: absolute
        top: 0
        right: 10px
        height: 100%
        line-height: 1
        padding: 0 1.5rem
        font-size: 3.2rem
        border: none
        background-color: #00abff
        color: #fff
        border-radius: 0 .25rem .25rem 0
        outline: none
    .search-btns
      display: none
</style>
