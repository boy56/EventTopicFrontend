/**
 * All provided echarts options.
 */
import nameMap from '../assets/data/name_map.json'
var schema = [
  {name: 'date', index: 0, text: '报道时间'},
  {name: 'text', index: 1, text: '危机指数'},
  {name: 'text', index: 4, text: '标题'}
]
var itemStyle = {
  opacity: 0.8,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0, 0, 0, 0.5)'
}
const ChartLib = {
  '折线图南海': {
    option: {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#0775e4'
          },
          crossStyle: {
            color: '#bbb'
          }
        },
        confine: true,
        extraCssText: 'max-width: 230px; background:rgba(17, 47, 117, 0.8); border:1px solid #0775e4',
        formatter: function (data) {
          // console.log(data);
          return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1e98ff"> \n' +
              '</span>' + '时间' + ':' + data[0].data[0].slice(0,10) + '<br> \n' +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FF5421"> \n' +
              '</span>' + '热度' + ':' + data[0].data[1] + '<br> \n';
        }
      },
      legend: {
        data: ['朝鲜','南海','台湾']
      },
      grid: {
        left: '6%',
        right: '6%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'time',
          // name: '发生日期',
        nameGap: 16,
        boundaryGap: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          interval: 1,
        },
        axisLine: {
          lineStyle: {
            color: '#2e63cf'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#052f5d'
          },
          width: 1
        },
        nameTextStyle: {
          color: 'white',
          fontSize: 14
        },
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
          data: []
        },
      ]
    }
  },
  '南海气泡图': {
    option: {
      backgroundColor: '',
      color: [
        '#dd4444', '#fec42c', '#80F1BE', '#dd4444', '#fec42c', '#80F1BE'
      ],
      legend: {
        top: 10,
        data: ['入侵行动', '国家立场', '防卫行动', '其他'],
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      grid: {
        left: '8%',
        right: '5%',
        top: '10%',
        bottom: '28%'
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3);font-size: 14px;padding-bottom: 1px;margin-bottom: 1px;">' + '新闻' + ' ' + value[2] + '</div>' + schema[1].text + '：' + value[1].toFixed(2) + '<br>' + schema[0].text + '：' + value[0] + '<br>';
        }
      },
      xAxis: {
        type: 'time',
          // name: '发生日期',
        nameGap: 16,
        boundaryGap: true,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          interval: 1,
        },
        axisLine: {
          lineStyle: {
            color: '#2e63cf'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#052f5d'
          },
          width: 1
        },
        nameTextStyle: {
          color: 'white',
          fontSize: 14
        },
          // splitLine: {
          //     show: false
          // },
          // axisLine: {
          //     lineStyle: {
          //         // color: '#eee'
          //     }
          // }
      },
      yAxis: {
        type: 'value',
        name: '危机指数',
        nameLocation: 'end',
          // nameGap: 20,
        nameTextStyle: {
          color: '#fff',
          fontSize: 12
        },
          // max: 100,
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [
        {
          right: '0%',
          top: '5%',
          show: false,
          dimension: 1,
          min: 0,
          max: 100,
          itemWidth: 20,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['圆形大小：事件重要性'],
          textGap: 30,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            symbolSize: [10, 20]
          },
          outOfRange: {
            symbolSize: function (data) {
              return Math.sqrt(data[1]) / 5e2;
            },
            color: ['rgba(255,255,255,.2)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#444']
            }
          }
        }
      ],
      series: [
        {
          name: '入侵行动',
          type: 'scatter',
          itemStyle: itemStyle,
          data: []
        },
        {
          name: '国家立场',
          type: 'scatter',
          itemStyle: itemStyle,
          data: []
        },
        {
          name: '防卫行动',
          type: 'scatter',
          itemStyle: itemStyle,
          data: []
        }
      ]
    }
  },
  '情绪分布图': {
    option: {
      legend: {
        icon: 'circle',
        x: 'left',
        itemWidth: 13,
        itemHeight: 13,
          // padding: [10, 20, 10, 10],
        left: '30%',
        top: '5%',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        data: ['正面','负面']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#0775e4'
          },
          crossStyle: {
            color: '#bbb'
          }
        },
        confine: true,
        extraCssText: 'max-width: 230px; background:rgba(17, 47, 117, 0.8); border:1px solid #0775e4',
        formatter: function (data) {
          return data[0].name.slice(0,10) + '<br> \n' +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1e98ff"> \n' +
              '</span>' + data[0].seriesName + ':' + data[0].value + '<br> \n' +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FF5421"> \n' +
              '</span>' + data[1].seriesName + ':' + data[1].value + '<br> \n';
        }
      },
      grid: {
        left: '2%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: [], // .map(stripDate),
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            formatter: function (data) {
              return data.slice(0,7);
            },
            interval: 4,
          },
          axisLine: {
            lineStyle: {
              color: '#2e63cf'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#052f5d'
            },
            width: 1
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
              // name: '百分比',
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0775e4'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#052f5d'
            },
            width: 1
          }
        },
      ],
      series: [
        {
          name: '负面',
          type: 'line',
          smooth: true,
              // symbol: 'circle',
              // showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
            }
          },
          itemStyle: {
            normal: {
              color: '#1e98ff',
              borderColor: '#1e98ff',
                      // borderWidth: 12

            }
          },
          data: []
        },
        {
          name: '正面',
          type: 'line',
          smooth: true,
              // symbol: 'circle',
              // showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
                      // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      //     offset: 0,
                      //     color: 'rgba(255, 84, 33, 0.9)'
                      // }, {
                      //     offset: 1,
                      //     color: 'rgba(255, 84, 33, 0.3)'
                      // }], false),
                      // shadowColor: 'rgba(0, 0, 0, 0.1)',
                      // shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: '#FF5421',
              borderColor: '#FF941E',
            }
          },
          data: []
        }
      ]
    }
  },
  '世界地图': {
    option: {
      title: {
        sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
        left: 'center',
        top: 'top'
      },
      tooltip: {
        trigger: 'item',
        'confine': true,
        'formatter': (p) => {
          let dataCon = p.data;
          let txtCon = dataCon.name + ':' + dataCon.value;
          return txtCon;
        }
      },
      visualMap: {
        min: 0,
        max: 1000000,
        bottom: 10,
        text: ['High','Low'],
        realtime: false,
        calculable: true,
        color: ['orangered','yellow','lightskyblue']
      },
      series: [
        {
          name: 'World Population (2010)',
          type: 'map',
          mapType: 'world',
          nameMap: nameMap,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'lightskyblue',
            },
            emphasis: {label: {show: true}}
          },
          data: [
                        {name: 'Afghanistan', value: 28397.812},
                        {name: 'Angola', value: 19549.124},
                        {name: 'Albania', value: 3150.143},
                        {name: 'United Arab Emirates', value: 8441.537},
                        {name: 'Argentina', value: 40374.224},
                        {name: 'Armenia', value: 2963.496},
                        {name: 'French Southern and Antarctic Lands', value: 268.065},
                        {name: 'Australia', value: 22404.488},
                        {name: 'Austria', value: 8401.924},
                        {name: 'Azerbaijan', value: 9094.718},
                        {name: 'Burundi', value: 9232.753},
                        {name: 'Belgium', value: 10941.288},
                        {name: 'Benin', value: 9509.798},
                        {name: 'Burkina Faso', value: 15540.284},
                        {name: 'Bangladesh', value: 151125.475},
                        {name: 'Bulgaria', value: 7389.175},
                        {name: 'The Bahamas', value: 66402.316},
                        {name: 'Bosnia and Herzegovina', value: 3845.929},
                        {name: 'Belarus', value: 9491.07},
                        {name: 'Belize', value: 308.595},
                        {name: 'Bermuda', value: 64.951},
                        {name: 'Bolivia', value: 716.939},
                        {name: 'Brazil', value: 195210.154},
                        {name: 'Brunei', value: 27.223},
                        {name: 'Bhutan', value: 716.939},
                        {name: 'Botswana', value: 1969.341},
                        {name: 'Central African Republic', value: 4349.921},
                        {name: 'Canada', value: 34126.24},
                        {name: 'Switzerland', value: 7830.534},
                        {name: 'Chile', value: 17150.76},
                        {name: '中国', value: 1359821.465},
                        {name: 'Ivory Coast', value: 60508.978},
                        {name: 'Cameroon', value: 20624.343},
                        {name: 'Democratic Republic of the Congo', value: 62191.161},
                        {name: 'Republic of the Congo', value: 3573.024},
                        {name: 'Colombia', value: 46444.798},
                        {name: 'Costa Rica', value: 4669.685},
                        {name: 'Cuba', value: 11281.768},
                        {name: 'Northern Cyprus', value: 1.468},
                        {name: 'Cyprus', value: 1103.685},
                        {name: 'Czech Republic', value: 10553.701},
                        {name: 'Germany', value: 83017.404},
                        {name: 'Djibouti', value: 834.036},
                        {name: 'Denmark', value: 5550.959},
                        {name: 'Dominican Republic', value: 10016.797},
                        {name: 'Algeria', value: 37062.82},
                        {name: 'Ecuador', value: 15001.072},
                        {name: 'Egypt', value: 78075.705},
                        {name: 'Eritrea', value: 5741.159},
                        {name: 'Spain', value: 46182.038},
                        {name: 'Estonia', value: 1298.533},
                        {name: 'Ethiopia', value: 87095.281},
                        {name: 'Finland', value: 5367.693},
                        {name: 'Fiji', value: 860.559},
                        {name: 'Falkland Islands', value: 49.581},
                        {name: 'France', value: 63230.866},
                        {name: 'Gabon', value: 1556.222},
                        {name: 'United Kingdom', value: 62066.35},
                        {name: 'Georgia', value: 4388.674},
                        {name: 'Ghana', value: 24262.901},
                        {name: 'Guinea', value: 10876.033},
                        {name: 'Gambia', value: 1680.64},
                        {name: 'Guinea Bissau', value: 10876.033},
                        {name: 'Equatorial Guinea', value: 696.167},
                        {name: 'Greece', value: 11109.999},
                        {name: 'Greenland', value: 56.546},
                        {name: 'Guatemala', value: 14341.576},
                        {name: 'French Guiana', value: 231.169},
                        {name: 'Guyana', value: 786.126},
                        {name: 'Honduras', value: 7621.204},
                        {name: 'Croatia', value: 4338.027},
                        {name: 'Haiti', value: 9896.4},
                        {name: 'Hungary', value: 10014.633},
                        {name: 'Indonesia', value: 240676.485},
                        {name: 'India', value: 1205624.648},
                        {name: 'Ireland', value: 4467.561},
                        {name: 'Iran', value: 240676.485},
                        {name: 'Iraq', value: 30962.38},
                        {name: 'Iceland', value: 318.042},
                        {name: 'Israel', value: 7420.368},
                        {name: 'Italy', value: 60508.978},
                        {name: 'Jamaica', value: 2741.485},
                        {name: 'Jordan', value: 6454.554},
                        {name: 'Japan', value: 127352.833},
                        {name: 'Kazakhstan', value: 15921.127},
                        {name: 'Kenya', value: 40909.194},
                        {name: 'Kyrgyzstan', value: 5334.223},
                        {name: 'Cambodia', value: 14364.931},
                        {name: 'South Korea', value: 51452.352},
                        {name: 'Kosovo', value: 97.743},
                        {name: 'Kuwait', value: 2991.58},
                        {name: 'Laos', value: 6395.713},
                        {name: 'Lebanon', value: 4341.092},
                        {name: 'Liberia', value: 3957.99},
                        {name: 'Libya', value: 6040.612},
                        {name: 'Sri Lanka', value: 20758.779},
                        {name: 'Lesotho', value: 2008.921},
                        {name: 'Lithuania', value: 3068.457},
                        {name: 'Luxembourg', value: 507.885},
                        {name: 'Latvia', value: 2090.519},
                        {name: 'Morocco', value: 31642.36},
                        {name: 'Moldova', value: 103.619},
                        {name: 'Madagascar', value: 21079.532},
                        {name: 'Mexico', value: 117886.404},
                        {name: 'Macedonia', value: 507.885},
                        {name: 'Mali', value: 13985.961},
                        {name: 'Myanmar', value: 51931.231},
                        {name: 'Montenegro', value: 620.078},
                        {name: 'Mongolia', value: 2712.738},
                        {name: 'Mozambique', value: 23967.265},
                        {name: 'Mauritania', value: 3609.42},
                        {name: 'Malawi', value: 15013.694},
                        {name: 'Malaysia', value: 28275.835},
                        {name: 'Namibia', value: 2178.967},
                        {name: 'New Caledonia', value: 246.379},
                        {name: 'Niger', value: 15893.746},
                        {name: 'Nigeria', value: 159707.78},
                        {name: 'Nicaragua', value: 5822.209},
                        {name: 'Netherlands', value: 16615.243},
                        {name: 'Norway', value: 4891.251},
                        {name: 'Nepal', value: 26846.016},
                        {name: 'New Zealand', value: 4368.136},
                        {name: 'Oman', value: 2802.768},
                        {name: 'Pakistan', value: 173149.306},
                        {name: 'Panama', value: 3678.128},
                        {name: 'Peru', value: 29262.83},
                        {name: 'Philippines', value: 93444.322},
                        {name: 'Papua New Guinea', value: 6858.945},
                        {name: 'Poland', value: 38198.754},
                        {name: 'Puerto Rico', value: 3709.671},
                        {name: 'North Korea', value: 1.468},
                        {name: 'Portugal', value: 10589.792},
                        {name: 'Paraguay', value: 6459.721},
                        {name: 'Qatar', value: 1749.713},
                        {name: 'Romania', value: 21861.476},
                        {name: 'Russia', value: 21861.476},
                        {name: 'Rwanda', value: 10836.732},
                        {name: 'Western Sahara', value: 514.648},
                        {name: 'Saudi Arabia', value: 27258.387},
                        {name: 'Sudan', value: 35652.002},
                        {name: 'South Sudan', value: 9940.929},
                        {name: 'Senegal', value: 12950.564},
                        {name: 'Solomon Islands', value: 526.447},
                        {name: 'Sierra Leone', value: 5751.976},
                        {name: 'El Salvador', value: 6218.195},
                        {name: 'Somaliland', value: 9636.173},
                        {name: 'Somalia', value: 9636.173},
                        {name: 'Republic of Serbia', value: 3573.024},
                        {name: 'Suriname', value: 524.96},
                        {name: 'Slovakia', value: 5433.437},
                        {name: 'Slovenia', value: 2054.232},
                        {name: 'Sweden', value: 9382.297},
                        {name: 'Swaziland', value: 1193.148},
                        {name: 'Syria', value: 7830.534},
                        {name: 'Chad', value: 11720.781},
                        {name: 'Togo', value: 6306.014},
                        {name: 'Thailand', value: 66402.316},
                        {name: 'Tajikistan', value: 7627.326},
                        {name: 'Turkmenistan', value: 5041.995},
                        {name: 'East Timor', value: 10016.797},
                        {name: 'Trinidad and Tobago', value: 1328.095},
                        {name: 'Tunisia', value: 10631.83},
                        {name: 'Turkey', value: 72137.546},
                        {name: 'United Republic of Tanzania', value: 44973.33},
                        {name: 'Uganda', value: 33987.213},
                        {name: 'Ukraine', value: 46050.22},
                        {name: 'Uruguay', value: 3371.982},
                        {name: 'United States of America', value: 312247.116},
                        {name: 'Uzbekistan', value: 27769.27},
                        {name: 'Venezuela', value: 236.299},
                        {name: 'Vietnam', value: 89047.397},
                        {name: 'Vanuatu', value: 236.299},
                        {name: 'West Bank', value: 13.565},
                        {name: 'Yemen', value: 22763.008},
                        {name: 'South Africa', value: 51452.352},
                        {name: 'Zambia', value: 13216.985},
                        {name: 'Zimbabwe', value: 13076.978}
          ]
        }
      ]
    }
  },
};
export {ChartLib};
