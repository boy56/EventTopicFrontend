<template>
  <div class="r-header">
    <b-navbar class="r-navbar" toggleable type="dark" >
      <!-- <b-link class="navbar-brand" href="./">
        <img src="../../assets/image/header-logo.png" alt="">
      </b-link> -->

      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="header-navbar-nav">
          <li class="nav-item">
            <div class="nav-link active">{{headdata}}</div>
          </li>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto pc-nav" style='color: white'>
          <div style="padding: 1.5rem">
            当前专题：<span style="color: white; font-weight: 700; font-family: 'Microsoft Yahei'">{{topic}}专题</span>
          </div>
          <li class="nav-item" style='color: white'>
            <a :href='"#/?event="+topic' class="nav-link active" target="_self" style='color: white'>
              <img src="~assets/image/home.png" alt="">
            </a>
          </li>
          <!-- <b-nav-item class="register-item" v-if="!user.logined" href="/account/#/register">注册</b-nav-item>
          <b-nav-item-dropdown v-else :text="user.userName" right-alignment>
            <b-dropdown-item href="/" v-if="user.logined">个人设置</b-dropdown-item>
            <b-dropdown-item href="/admin/" v-if="user.roles && user.roles.indexOf('admin') !== -1">管理员</b-dropdown-item>
            <b-dropdown-item href="/api/auth/logout">退出</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    'headdata': {
      type: String,
      default () {
        return '';
      }
    },
    'topic': {
      type: String,
      default () {
        return '南海';
      }
    }
  },
  data () {
    return {
      title: '事件',
      searchfn: x => x, // identity function.
      nosearch: false,
    };
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  created: function () {
    window.bus.$on('search-disable', nosearch => { this.nosearch = nosearch; });
    window.bus.$on('search-title', title => { this.title = title; });
    window.bus.$on('search-fn', searchfn => { this.searchfn = searchfn; });
  },
  methods: {
    doSearch: function () {
      if (this.topic && this.searchfn) {
        this.searchfn(this.topic)
      }
    },
    inputDone: function (event) {
      if (event.target === document.activeElement && event.keyCode === 13) {
        this.doSearch();
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import "../../assets/sass/mixin"
.r-header
  // flex-grow: 0
  // flex-shrink: 0
  // @include r_navbar
  background-color: #158bdc
.r-navbar
  width: 100%
  padding: 0 1rem
@media (min-width: 1200px)
  .r-navbar
    width: 1200px
    margin: 0 auto
    .navbar-brand
      margin-right: 2em
@media (max-width: 768px)
  padding: 1rem 0
.r-navbar
  .header-navbar-nav
    .nav-link
      padding: 1.5rem 1.5rem
      color: #007bff
      transition: .3s
      &:hover, &.active
        color: #fff
        background-color: #0a7ac9
.navbar-nav
  .nav-item.dropdown
    min-width: 75px
  .dropdown-menu
    min-width: 100%
    text-align: center
    width: 100%
    .dropdown-item
      padding: 3px 0
      transition: .3s
      &:focus, &:hover
        color: $dropdown_item_hover_c
        background-color: $dropdown_item_hover_bgc
        outline: none
.pc-nav
  .login-item, .register-item
    .nav-link
      padding: 1.5rem 0rem
      transition: .3s
      padding-left: 38px
      padding-right: 14px
      color: #daebf7
      &:focus, &:hover
        color: #fff
        background-color: #0a7ac9
        outline: none
  .login-item
    .nav-link
      background: url("~assets/image/login.png") no-repeat 14px center
      &:hover
        background-image: url("~assets/image/login_hover.png")
  .register-item
    .nav-link
      background: url("~assets/image/register.png") no-repeat 15px center
      &:hover
        background-image: url("~assets/image/register_hover.png")
.navbar-inverse
  .navbar-nav
    .nav-link
      transition: 0.3s
      font-size: 1.6rem
      // @include nav_link

/*搜索框*/
.header-search
  margin: auto
  width: 34rem
  max-width: 34rem
  background-color: $search_bgc
  border-radius: 5px
  border: 1px solid #ddd
  /*左侧下拉框*/
  /*.btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle*/
    /*background-color: #0099ff*/
    /*color: #fff*/
  .btn-secondary
    background-color: transparent
    color: $search_btn_c
    border: none!important
    cursor: pointer
    line-height: 1.25
    font-size: 1.6rem
    outline: none!important
  /*.dropdown-menu*/
    /*width: 100%*/
    /*min-width: 100%*/
    /*text-align: center*/
    /*background-color: rgba(255, 255, 255, .4)*/
    /*.dropdown-item*/
      /*color: rgba(255, 255, 255, .8)*/
      /*padding: 3px 0*/
      /*&:hover, &:focus*/
        /*background-color: #0099ff*/
  /*输入框*/
  .form-control
    background-color: transparent
    border: none
    font-size: 1.6rem
    // @include form_control
  /*搜索按钮*/
  .btn-submit
    border: none
    cursor: pointer
    transition: .3s
    color: $search_btn_c
    &:hover
      color: $highlight_c

/*移动端*/
@media (max-width: 768px)
  .header-search
    display: none
  .navbar-toggleable-sm
    .navbar-nav
      .nav-link
        padding: 0.5rem 0
  .r-navbar
    .navbar-brand
      padding: .8rem 0
@media (min-width: 768px) and (max-width: 1440px)
  .r-navbar .navbar-brand
    padding: .25rem 2rem
    margin-right: 2rem
  .header-search
    margin: auto
    width: auto
  .navbar-toggleable-sm
    .header-navbar-nav
      .nav-link
        padding: 0.5rem 1rem
@media (min-width: 1440px)
  .navbar-toggleable-sm
    .header-navbar-nav
      .nav-link
        padding: 0.5rem 2rem
</style>
