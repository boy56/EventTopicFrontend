<template>
  <div id="app" class="real-body">
    <!-- <canvas id="bg"></canvas> -->
    <div class="con-box title">
          <div style="background-color: rgb(0, 0, 0);color: #00abff;text-align: center;">专题事件检测与辅助预测分析</div>
      </div>
    <div :href="'/' + jumpto" class="con-box l-t-box">
    <div class="box light-corner view-core toogle-tab-element">
      <router-link :to="{ name: 'xuanti', params: { topic: topic}}">
        <div class="view-table start_box box_align pack_center">
              <div class="view-table start_box box_align pack_center">
              <div class="table-item table-item-active  start_box box_align pack_center box-flex" id="inner-view-tab"><span class="iconfont icon-yuqing"></span>
              综合选题<span class="unqie-guang"></span></div>
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>朝核<span class="unqie-guang"></span></div> -->
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>综合选题<span class="unqie-guang"></span></div> -->
          </div>
        </div>
      </router-link>
        <!-- <div class="view-list-wrapper" v-for="v in left_up_list" :key="v.index"> -->
          <div class="view-list-wrapper">
              <div class="view-list tianjin-view-div" id="inner-view-div" style="color: white">
                  <ul class="list-item inner-view-list" id="inner-view-list" >
                      <!-- <div class='list-text'>{{v.time.slice(0,10)}}&nbsp;&nbsp;{{v.title}}</div> -->
                      <li class="item box clearfix" v-bind:key=e v-for="e in left_up_list" @click='clicking_news(e.views)'>
                        <div class="item-content">
                          <div class="content-top ">
                            <span class="view-type attr-block">{{topic}}</span>
                            <p class="title">{{e.title}}</p>
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
              <td :style="{color: topic_color1}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('南海')">南海新闻(100324)</td>
              <td :style="{color: topic_color2}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('朝核')">朝核新闻(203234)</td>
              <td :style="{color: topic_color3}" style="background-color: rgb(0, 0, 0);text-align: center;" @click="clicking('南海')">台湾新闻(234353)</td>
            </tr>
          </table>
          <Echarts theme="ring" :option="options.worldmap.option" className="chart" style="top:0;bottom:3%"></Echarts>
      </div>
    <div class="con-box r-t-box" @click="goto">
      <!-- <Echarts theme="ring" :option="options.right_up.option" className="chart" ></Echarts> -->
      <div class="box light-corner view-core toogle-tab-element">
        <router-link :to="'/view'">
        <div class="view-table start_box box_align pack_center">
              <div class="view-table start_box box_align pack_center">
              <div class="table-item table-item-active  start_box box_align pack_center box-flex" id="inner-view-tab"><span class="iconfont icon-yuqing"></span>
              专家观点<span class="unqie-guang"></span></div>
              <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>津外视角<span class="unqie-guang"></span></div> -->
          </div>
        </div>
        </router-link>
        <div class="view-list-wrapper">
              <div class="view-list tianjin-view-div" id="inner-view-div" style="color: white">
                  <ul class="list-item inner-view-list" id="inner-view-list">
                        <!-- <div>{{v.personname}}&nbsp;&nbsp;{{v.verb}}&nbsp;&nbsp;{{v.viewpoint|ellipsis}}</div> -->
                    <li class="item box clearfix" v-bind:key=e v-for="e in right_up_list">
                        <div class="item-content">
                          <div class="content-top ">
                            <span class="view-type attr-block">{{e.country}}</span>
                            <p class="title">{{e.viewpoint}}</p>
                          </div>
                          <div class="content-bt clearfix">
                            <span class="time left"><i class="iconfont icon-clock-o"></i>{{e.timestr}}</span>
                            <span class="from"><i class="iconfont icon-resource"></i>{{e.orgname}}{{e.pos}}{{e.personname}}</span>
                          </div>
                        </div>
                      </li>
                  </ul>
              </div>
        </div>
    </div>
    </div>
    <div class="con-box l-b-box" @click="goto">
      <div style="text-align: center; margin-bottom: .5rem">
        <span style="font-size: 20px;color:white">热度趋势</span>
      </div>
      <!-- <font size="3" color="white">{{Data.}}</font> -->
      <Echarts theme="ring" :option="options.left_down.option" className="chart" ></Echarts>
    </div>
    <div class="con-box r-b-box" @click="goto">
        <div class="view-core" style='height:18%;overflow:hidden;border-top: 1px solid #052b55;'>
        <router-link :to="'/eventa'">
          <div class="view-table start_box box_align pack_center">
                <div class="view-table start_box box_align pack_center">
                <div class="table-item table-item-active  start_box box_align pack_center box-flex" id="inner-view-tab"><span class="iconfont icon-yuqing"></span>
                热点事件<span class="unqie-guang"></span></div>
                <!-- <div class="table-item  start_box box_align pack_center box-flex" id="outer-view-tab"><span class="iconfont icon-yuqing"></span>津外视角<span class="unqie-guang"></span></div> -->
            </div>
          </div>
        </router-link>
      </div>
        <Echarts theme="ring" :option="options.right_down.option" className="chart"></Echarts>
    </div>
     <div class="con-box r-b1-box" @click="goto">
        <!-- <div class="module-wrapper opinion-emotion">
                    <div class="module-title"><span class="iconfont icon-yuqing"></span>情绪分布图</div>
                    <div id="discuss-emotion" class="box light-corner discuss-emotion"></div>
        </div> -->
        <div style="text-align: center;margin-bottom: .5rem">
           <span style="font-size: 20px;color: white;">情绪分析</span>
        </div>
        <Echarts theme="ring" :option="options.right1_down.option" className="chart" ></Echarts>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'components/charts/theme/Ring.js'
  // import Data from '../assets/data/data.json'
  // import Demo from "../assets/data/mainpage_demo.json"
  import Echarts from 'vue-echarts-v3/src/full.js'
  // import "yugu/js/jquery-1.8.0.min.js"
  // import {fishBone} from "yugu/js/fishBone.js"
  // import "yugu/js/jquery.SuperSlide.2.1.1.js"
  import echarts from 'echarts'
  require('echarts-gl');

  import 'echarts/map/js/world.js';

  import Common from 'components/Common.js'

  import {ChartLib} from './ChartLib.js'

  import BaseTexture from 'components/texture/Base.js'
  // import HeightTexture from 'components/texture/Height.js'
  import BlendTexture from 'components/texture/Blend.js'
  // import OverlayTexture from 'components/texture/Overlay.js'
  // import ambientTexture from '../assets/get/s/data-1491837984109-r1u7NmY6e.hdr'

  const baseTexture = new Image();
  baseTexture.src = BaseTexture.texture;
  // baseTexture.crossOrigin = 'anonymous';
  // baseTexture.src = require('../../assets/map-rc/data-1491890179041-Hkj-elqpe.jpg');

  // const heightTexture = new Image();
  // heightTexture.src = HeightTexture.texture;
  // heightTexture.crossOrigin = 'anonymous';
  // heightTexture.src = require('../../assets/map-rc/data-1491889019097-rJQYikcpl.jpg');

  const blendTexture = new Image();
  blendTexture.src = BlendTexture.texture;
  // blendTexture.crossOrigin = 'anonymous';
  // blendTexture.src = require('../../assets/map-rc/data-1491890291849-rJ2uee5ag.jpg')

  // This one is indeed not needed.
  // const overlayTexture = new Image();
  // overlayTexture.src = GlobeTexture.overlayTexture;
  // // overlayTexture.crossOrigin = 'anonymous';
  // // overlayTexture.src = require('../../assets/map-rc/data-1491890092270-BJEhJg96l.png')

  const heightTexture = new Image();
  heightTexture.src = require('../assets/get/s/data-1491889019097-rJQYikcpl.jpg');

  // const ambientTexture_src = require('../assets/get/s/data-1491837984109-r1u7NmY6e.hdr');

  // import jpg from '../assets/get/s/data-1491889019097-rJQYikcpl.jpg'
  // import hdr from '../assets/get/s/data-1491837984109-r1u7NmY6e.hdr'

  export default {
    data () {
      return {
        Common: Common,
        jumpto: '',
        Demo: {},
        topic: '南海',
        topic_color1: 'red',
        topic_color2: '#00abff',
        topic_color3: '#00abff',
        topics: [1,2,3],
        topic_index: 0,
        intervalID: null,
        intervalRotate: null,
        region: null,
        regions: null,
        result: null,
        nowCityIndex: 0,
        rotateCities: [],
        left_up_list: [],
        right_up_list: [],
        options: {
          left_up: { option: {}, update: () => { return; } },
          right_up: { option: {}, update: () => { return; } },
          worldmap: { option: {}, update: () => { return; } },
          left_down: { option: {}, update: () => { return; } },
          right_down: { option: {}, update: () => { return; } },
          right1_down: { option: {}, update: () => { return; } },
        },
        globe_t_option: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          //  title: {
          //    text: '铜仁 -> 北京',
          //    left: 'center',
          //    bottom: '80',
          //    textStyle: {
          //      color: '#fff',
          //      width: '200%',
          //      fontSize: 40
          //    },
          //    padding: [20, 50],
          //    borderWidth: 2,
          //    borderColor: 'rgb(1, 241, 228)',
          //    borderRadius: 10,
          //    backgroundColor: 'rgba(29, 81, 203, .8)',
          //    zlevel: 101
          //  },
          globe: {
            globeRadius: 95,
            globeOuterRadius: 500,
            baseTexture: baseTexture.src,
            heightTexture: heightTexture.src,
            displacementScale: 0.2,
            shading: 'lambert',
            light: {
              ambient: {
                intensity: 0.5
              },
              main: {
                intensity: 1.25
              }
            },
            layers: [{
              type: 'blend',
              blendTo: 'emission',
              texture: blendTexture.src,
            }],
            viewControl: {
              alpha: 27,
              // beta: -160,
              autoRotate: true,
              autoRotateSpeed: 20,
              zoomSensitivity: 1,
              // rotateSensitivity: 0,
              // targetCoord: [110, 33],
              animationDurationUpdate: 1250,
            },
          },
          series: [{
            name: '城市',
            type: 'scatter3D',
            coordinateSystem: 'globe',
            zlevel: 100,
            animation: true,
            blendMode: 'lighter',
            symbol: 'pin',
            symbolSize: 30,
            itemStyle: {
              normal: {
                color: '#fa3434',
                opacity: 1,
              },
            },
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                distance: 5,
                textStyle: {
                  color: '#fff',
                  padding: 5,
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: '#0775e4',
                  backgroundColor: 'rgba(29, 81, 203, .8)',
                },
              },
            },
            data: [],
          }, {
            type: 'lines3D',
            coordinateSystem: 'globe',
            name: '航线',
            lineStyle: {
              color: '#00abe0',
              opacity: 1,
              width: 4,
            },
            effect: {
              show: false,
              period: 4,
              // constantSpeed: 30,
              symbol: 'arrow',
              trailWidth: 3,
              trailLength: 0.8,
              trailOpacity: 1,
              // trailColor: '#ff4d43'
            },
            data: [],
          }]
        }
      }
    },
    mounted () {
      console.log('ningyx');
      this.echartsGlobe();
      this.getGoodsList();
      // this.left_up_list = this.Demo.news_views_data;
      // console.log(this.left_up_list);
      // this.right_up_list = this.left_up_list[0].views;
      // console.log(this.right_up_list);
      // // 热度趋势图
      // this.options.left_down.option = ChartLib['折线图南海'].option;
      // this.options.left_down.option.xAxis.data = this.Demo.hot_data.hot_date;
      // this.options.left_down.option.series[0].data = this.Demo.hot_data.hot_num;
      // console.log(this.options.left_down.option);

      // // 情绪分布图
      // this.options.right1_down.option = ChartLib['情绪分布图'].option;
      // this.options.right1_down.option.xAxis.data = this.Demo.sentiment_data.sentiment_data;
      // this.options.right1_down.option.series[0].data = this.Demo.sentiment_data.sentiment_neg;
      // this.options.right1_down.option.series[1].data = this.Demo.sentiment_data.sentiment_pos;

      // //  热点事件图
      // this.options.right_down.option = ChartLib['南海气泡图'].option;
      // // console.log(Demo.event_data)
      // this.options.right_down.option.legend.data = this.Demo.event_data.legend;
      // this.options.right_down.option.series = this.Demo.event_data.series;
      this.findDatas();
    },
    created () {
      this.initOptions();
      this.intervalID = setInterval(() => {
        this.initOptions()
      }, 100 * 1000);

      setInterval(() => {
        if (this.topic_index === (3)) {
          this.topic_index = 0;
        };
        if (this.topic_index === 0) {
          this.around(63);
        } else {
          this.around(41);
        }
        // this.clicking(this.topics[this.topic_index]);
        this.topic_index = this.topic_index + 1;
      }, 10000);

      this.intervalGlobe = setInterval(() => {
        if (this.globe) {
          this.globe.clear();
          this.echartsGlobe();
        }
      }, 1 * 60 * 60 * 1000);
      axios.get('/api/getPageJump', {params: {}}).then(response => {
        // alert(response.data.page0.to)
        // eslint-disable-next-line no-unused-vars
        this.jumpto = response.data.page2.to;
        // let timer = setTimeout(function () { location.href = '../' + response.data.page1.to; } , response.data.page1.delay * 1000);
      });
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 20) {
          return value.slice(0,20) + '...'
        }
        return value
      },
      ellipsisname (value) {
        if (!value) return ''
        if (value.length > 5) {
          return value.slice(0,5) + '...'
        }
        return value
      }
    },
    methods: {
      findDatas: function (filter = {
      }) {
        axios.get('api/search_main', {params: {
          theme: this.topic,
        }}).then(response => {
          console.log(response);
          console.log(response.data)
          this.Demo.news_views_data = response.data.news_views_data;
          this.Demo.hot_data = response.data.hot_data;
          this.Demo.sentiment_data = response.data.sentiment_data;
          this.Demo.event_data = response.data.event_data;
          this.Demo.map_data = response.data.map_data;
        // 事件观点表格
        // this.innerOuterViewList("ul#inner-view-list", this.Demo.news_views_data, false);
        // console.log(this.Demo);
        // console.log(this.Demo.news_views_data);
        // console.log(this.Demo.hot_data);
          this.left_up_list = this.Demo.news_views_data;
          for (var i = 0; i < this.left_up_list.length; i++) {
            this.left_up_list[i].timestr = new Date(this.left_up_list[i].time).format('yyyy-MM-dd');
          }
        // console.log(this.left_up_list);
          this.right_up_list = this.left_up_list[0].views;
        // console.log(this.right_up_list);
        // 热度趋势图
          this.options.left_down.option = ChartLib['折线图南海'].option;
          this.options.left_down.option.xAxis.data = this.Demo.hot_data.hot_date;
          this.options.left_down.option.series[0].data = this.Demo.hot_data.hot_num;
        // console.log(this.options.left_down.option);

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

        //  世界地图
          this.options.worldmap.option = ChartLib['世界地图'].option;
          this.options.worldmap.option.visualMap.min = this.Demo.map_data.min
          this.options.worldmap.option.visualMap.max = this.Demo.map_data.max
          this.options.worldmap.option.series[0].data = this.Demo.map_data.data
        // console.log(this.Demo);
        // console.log(this.Demo.data);
        });
      },
      goto: function () {
        // document.location.href = Common.addr + Common.page1;
      },
      getGoodsList () {
        axios.get('/goods').then((res) => {
          this.result = res.data
          console.log(this.result)
        })
      },
      initOptions: function () {
        axios.get('/api/getShowCharts').then(response => {
          _.each(response.data, (v, k) => {
            if (ChartLib[v]) {
              this.options[k].option = _.cloneDeep(ChartLib[v].option);
              this.options[k].update = ChartLib[v].update;
            }
          });
          this.updateData();
        });
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
        this.around(41);
      },
      clicking_news: function (term) {
        this.right_up_list = term;
        this.around(41);
      },
      each: function (a,b) {
        for (var c = 0,d = a.length; d > c && b(c,a[c]) !== !1; c++);
      },
      innerOuterViewList: function (targetList, data, outerTJ) {
        // var tpl = '{{#events}} \n' +
        var tpl = '<li class="item box clearfix" v-for="e in events" :key="v.index"> \n' +
                '<div class="item-content"> \n' +
                    '<div class="content-top "> \n' +
                        '<span class="view-type attr-block">{{e.typestr}}</span> \n' +
                        '<p class="title">{{e.title}}</p> \n' +
                    '</div> \n' +
                    '<div class="content-bt clearfix"> \n' +
                        '<span class="time left"><i class="iconfont icon-clock-o"></i>{{e.timestr}}</span> \n' +
                        // '{{#outerTJ}}<span class="relevancy">相关度：{{relativity}}%</span>{{/outerTJ}} \n' +
                        '<span class="from"><i class="iconfont icon-resource"></i>来源：{{e.content_label}}</span> \n' +
                    '</div> \n' +
                '</div> \n' +
            '</li>';
        // '{{/events}}';
        var cnt = 0;
        var items = [];
        this.each(data, function (i, d) {
            // if(d.description.indexOf('大脑体积') != -1 || d.description.indexOf('全县组织工作会议召开') != -1) {
                // return true;
            // }
          d.timestr = d.time.split('T')[0];
            // d.typestr = typeArr[parseInt(d.eventType)];
            // if (d.src === '新闻') {
                // d.es_type = 0;
            // }
            // else {
                // d.es_type = 1;
            // }
            // var eventType = parseInt(d.eventType)
            // if (eventType == 1 || eventType == 25) {
            //     d.typestr = typeArr[eventType];
            //     d.typecolor = "#FF7920!important";
            // }
            // else if (eventType == 4) {
            //     d.typestr = "科技";
            //     d.typecolor = "#60A3F5!important";
            // }
            // else {
            //     d.typestr = typeArr[eventType].split(" ")[0];
            //     d.typecolor = "#87A5B5!important";
            // }
          d.typestr = '南海';
            // d.relativity = Math.floor(d.relativity * (90-60) / 100 + 60),
          items.push(d);
          if (cnt++ > 2) {
            return false;
          }
        });
        (targetList).html(Mustache.render(tpl, {events: items, outerTJ: outerTJ}));
      },
      findcountry: function (country) {
        var o;
        // console.log(country);
        for (o in this.regions) {
          if (o.name === country) {
            return o;
          }
        }
      },
      updateData: function () {
        _.each(this.options, opt => {
          opt.update(opt.option);
        });
        this.update_globe_option();
      },
      echartsGlobe () {
        // 创建一个canvas类型的对象(mapChart)来作为地球的纹理(baseTexture)
        let canvas = document.createElement('canvas');
        let mapChart = echarts.init(canvas, null, {
          width: 2048,
          height: 1024
        });

        mapChart.setOption({
          backgroundColor: '#999',
          geo: {
            type: 'map',
            map: 'world',
            boundingCoords: [[-180, 90], [180, -90]],
                // silent: true,
            itemStyle: {
              normal: {
                borderColor: '#000'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#fff',
                  fontSize: 40
                }
              }
            }
          }
        });
        this.regions = mapChart.getModel().getComponent('geo').coordinateSystem.regions;
      },
      around (index) {
        this.region = this.regions[index];
      },
      update_globe_option () {
        this.globe_t_option.globe.displacementScale = 0.1249;
        axios.get('/api/getAirway', {params: {
          from: Math.floor(new Date().getTime() / 1000) - 24 * 3600,
          to: Math.floor(new Date().getTime() / 1000),
        }}).then(response => {
          let cities = [];
          let lines = [];
          _.each(response.data, item => {
            cities.push({name: item.departure.CityName, value: item.departure.Coordinate});
            cities.push({name: item.destination.CityName, value: item.destination.Coordinate});
            lines.push([item.departure.Coordinate, item.destination.Coordinate]);
          });
          this.globe_t_option.series[0].data = cities; // _.uniqBy(cities, 'name');
          this.globe_t_option.series[1].data = lines;
          this.globe_t_option.globe.displacementScale = 0.125;
          if (this.globe) {
            this.globe.setOption(this.globe_t_option);
          }
          this.rotateCities = response.data;
        });
      },
      rotate_globe: function () {
        if (!_.isEmpty(this.rotateCities)) {
          let tmpx = Math.floor(this.nowCityIndex / 2);
          let tmpy = this.nowCityIndex % 2;
          // console.log(tmpx + "  " + tmpy + " length:" + this.rotateCities.length)
          // let centerl = [110, 33]
          let cantern = '铜仁'
          if (tmpy === 0) {
          //  centerl = this.rotateCities[tmpx].departure.Coordinate;
            cantern = this.rotateCities[tmpx].departure.CityName + ' -> ' + this.rotateCities[tmpx].destination.CityName;
          } else {
          //  centerl = this.rotateCities[tmpx].destination.Coordinate;
            cantern = this.rotateCities[tmpx].departure.CityName + ' -> ' + this.rotateCities[tmpx].destination.CityName;
          }
          this.nowCityIndex = this.nowCityIndex + 1;
          this.nowCityIndex = Math.floor(this.nowCityIndex / 2) >= this.rotateCities.length ? 0 : this.nowCityIndex;
          this.globe.setOption({
            title: {
              text: cantern
            },
            globe: {
              viewControl: {
                // targetCoord: centerl,
              },
            }
          });
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.intervalID)
      clearInterval(this.intervalGlobe)
      clearInterval(this.intervalRotate)
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
      width: 100%
      height: 7%
      top: 0rem
      background-image: none
    &.l-t-box
      left: 0%
      width: 30%
      top: 7%
    &.world-map
      left: 32%
      overflow: hidden
      width: 38%
      top: 7%
      background-image: none
    &.r-t-box
      right: 0%
      width: 30%
      top: 7%
    &.l-b-box
      overflow: hidden
      left: 0%
      width: 33%
      bottom: 1.2rem
    &.r-b-box
      overflow: hidden
      right: 0%
      width: 32%
      bottom: 1.2rem
    &.r-b1-box
      overflow: hidden
      left: 34%
      width: 33%
      bottom: 1.2rem
      .chart
        bottom: 100rem
        width: 100%
        height: 80%
  .center-box
    position: absolute
    left: 0rem
    top: 0rem
    width: 100%
    height: 100%
    z-index: 0
    .chart
      width: 100%
      height: 100%
      cursor: pointer
</style>
