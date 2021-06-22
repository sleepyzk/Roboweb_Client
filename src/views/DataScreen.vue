<template>
    <div class="container">
        <el-row>
            <el-col :lg="10">
                <dv-decoration-8 style="width:100%;height:30px;"/>
                <dv-decoration-10 style="width:100%;height:10px;margin-top: 10px"/>
            </el-col>
            <el-col :lg="4">
                <div style="text-align: center;color: white;margin: 0 0 5px 0"><span
                        style="font-size: 25px">数据可视化</span></div>
                <dv-decoration-6 style="width:80%;height:15px;margin: auto" :reverse="true"
                                 :color="['#50e3c2', '#67a1e5']"/>
            </el-col>
            <el-col :lg="10">
                <dv-decoration-8 :reverse="true" style="width:100%;height:30px;"/>
                <dv-decoration-10 style="width:100%;height:10px;margin-top: 10px"/>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col :lg="7">
                <dv-border-box12>
                    <div style="padding: 10px 10px 10px 10px;margin-top: 15px">
                        <div class="box_left1">
                            <dv-charts :option="option1"/>
                        </div>
                    </div>
                </dv-border-box12>
                <dv-border-box12>
                    <div style="padding: 10px 10px 10px 10px;margin-top: 5px">
                        <div class="box_left2">
                            <dv-charts :option="option3"/>
                        </div>
                    </div>
                </dv-border-box12>
            </el-col>
            <el-col :lg="10">
                <dv-border-box12>
                    <div style="padding: 10px 10px 10px 10px;margin-top: 15px">
                        <div class="box_mid1" ref="mapChart"></div>
                        <div class="box_mid2">
                            <dv-scroll-board :config="config" style="width:100%;height:100%;" />
                        </div>
                    </div>
                </dv-border-box12>
            </el-col>
            <el-col :lg="7">
                <dv-border-box12>
                    <div style="padding: 10px 10px 10px 10px;margin-top: 15px">
                        <div class="box_right1">
                            <dv-charts :option="option2"/>
                        </div>
                    </div>
                </dv-border-box12>
                <dv-border-box12>
                    <div style="padding: 10px 10px 10px 10px;margin-top: 5px">
                        <div class="box_right2">
                            <dv-decoration-3 style="width:200px;height:30px;" />
                            <dv-charts :option="option4"/>
                        </div>
                    </div>
                </dv-border-box12>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import "echarts/map/js/china.js";

    export default {
        name: "DataScreen",
        data() {
            return {
                myChart: '',
                config:{
                    header:['地点','总设备数','运行设备数'],
                    data:[
                        ['行1列1', '行1列2', '行1列3'],
                        ['行2列1', '行2列2', '行2列3'],
                        ['行3列1', '行3列2', '行3列3'],
                        ['行4列1', '行4列2', '行4列3'],
                        ['行5列1', '行5列2', '行5列3'],
                        ['行6列1', '行6列2', '行6列3'],
                        ['行7列1', '行7列2', '行7列3'],
                        ['行8列1', '行8列2', '行8列3'],
                        ['行9列1', '行9列2', '行9列3'],
                        ['行10列1', '行10列2', '行10列3']
                    ]
                },
                option1: {
                    title: {
                        text: '图一',
                    },
                    xAxis: {
                        name: '第一周',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        name: '销售额',
                        data: 'value'
                    },
                    series: [
                        {
                            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                            type: 'bar',
                            gradient: {
                                color: ['#37a2da', '#67e0e3']
                            }
                        }
                    ]
                },
                option2: {
                    title: {
                        text: '图二'
                    },
                    xAxis: {
                        name: '第一周',
                        data: 'value'
                    },
                    yAxis: {
                        name: '销售额',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    series: [
                        {
                            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                            type: 'bar',
                            animationCurve: 'easeOutBack'
                        }
                    ]
                },
                option3: {
                    title: {
                        text: '图三'
                    },
                    legend: {
                        data: [
                            {
                                name: '销售额',
                                color: '#aeeff0'
                            },
                            {
                                name: '人流量',
                                color: '#f1829f'
                            }
                        ]
                    },
                    xAxis: {
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: [
                        {
                            name: '销售额',
                            data: 'value'
                        },
                        {
                            name: '人流量',
                            data: 'value',
                            position: 'right',
                            max: 2000,
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: '人流量',
                            data: [1000, 1200, 900, 1500, 900, 1200, 1000],
                            type: 'line',
                            smooth: true,
                            lineArea: {
                                show: true,
                                gradient: ['rgba(251, 114, 147, 1)', 'rgba(251, 114, 147, 0)']
                            },
                            lineStyle: {
                                stroke: 'rgba(251, 114, 147, 1)',
                                lineDash: [3, 3]
                            },
                            linePoint: {
                                style: {
                                    stroke: 'rgba(251, 114, 147, 1)'
                                }
                            },
                            yAxisIndex: 1
                        },
                        {
                            name: '销售额',
                            data: [1500, 1700, 1400, 2000, 1400, 1700, 1500],
                            type: 'bar',
                            gradient: {
                                color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)']
                            },
                            barStyle: {
                                stroke: 'rgba(103, 224, 227, 1)'
                            }
                        }
                    ]
                },
                option4: {
                    title: {
                        text: '图四'
                    },
                    legend: {
                        data: ['同比', '环比'],
                        orient: 'vertical'
                    },
                    series: [
                        {
                            name: '同比',
                            type: 'pie',
                            data: [
                                {name: '可口可乐', value: 93},
                                {name: '百事可乐', value: 32},
                                {name: '哇哈哈', value: 65},
                                {name: '康师傅', value: 44},
                                {name: '统一', value: 52},
                            ],
                            radius: '30%',
                            outsideLabel: {
                                show: false
                            },
                            insideLabel: {
                                show: true
                            }
                        },
                        {
                            name: '环比',
                            type: 'pie',
                            data: [
                                {name: '可口可乐', value: 93},
                                {name: '百事可乐', value: 32},
                                {name: '哇哈哈', value: 65},
                                {name: '康师傅', value: 44},
                                {name: '统一', value: 52},
                            ],
                            radius: ['40%', '50%']
                        }
                    ]
                }
            }
        },
        methods: {
            initMapChart() {
                this.myChart = this.$echarts.init(this.$refs.mapChart);
                let option1 = {
                    tooltip: {
                        show: false
                    },
                    geo: {
                        map: "china",
                        roam: false,// 一定要关闭拖拽
                        zoom: 1.23,
                        center: [105, 36], // 调整地图位置
                        label: {
                            normal: {
                                show: false, //关闭省份名展示
                                fontSize: "10",
                                color: "rgba(0,0,0,0.7)"
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: "#0d0059",
                                borderColor: "#389dff",
                                borderWidth: 1, //设置外层边框
                                shadowBlur: 5,
                                shadowOffsetY: 8,
                                shadowOffsetX: 0,
                                shadowColor: "#01012a"
                            },
                            emphasis: {
                                areaColor: "#184cff",
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 5,
                                borderWidth: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    },
                    series: [
                        {
                            type: "map",
                            map: "china",
                            roam: false,
                            zoom: 1.23,
                            center: [105, 36],
                            // geoIndex: 1,
                            // aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: "#fff"
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: "#0d0059",
                                    borderColor: "#389dff",
                                    borderWidth: 0.5
                                },
                                emphasis: {
                                    areaColor: "#17008d",
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 5,
                                    borderWidth: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                };
                this.myChart.setOption(option1);
                let dataValue = this.dealWithData();
                let data1 = dataValue.splice(0, 6);
                let option2 = {
                    series: [
                        {
                            type: "map",
                            map: "china",
                            roam: false,
                            zoom: 1.23,
                            center: [105, 36],
                            // geoIndex: 1,
                            // aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: "#0d0059",
                                    borderColor: "#389dff",
                                    borderWidth: 0.5
                                },
                                emphasis: {
                                    areaColor: "#17008d",
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 5,
                                    borderWidth: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        },
                        {
                            name: "",
                            type: "scatter",
                            coordinateSystem: "geo",
                            data: dataValue,
                            //   symbolSize: function(val) {
                            //     return val[2] / 10;
                            //   },
                            symbol: "circle",
                            symbolSize: 8,
                            hoverSymbolSize: 10,
                            tooltip: {
                                formatter(value) {
                                    return value.data.name + "<br/>" + "总设备数：" + "22" + "<br/>" + "运行设备数：" + "13";
                                },
                                show: true
                            },
                            encode: {
                                value: 2
                            },
                            label: {
                                formatter: "{b}",
                                position: "right",
                                show: false
                            },
                            itemStyle: {
                                color: "#0efacc"
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        {
                            name: "Top 5",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: data1,
                            symbolSize: 15,
                            tooltip: {
                                show: false
                            },
                            encode: {
                                value: 2
                            },
                            showEffectOn: "render",
                            rippleEffect: {
                                brushType: "stroke",
                                color: "#0efacc",
                                period: 9,
                                scale: 5
                            },
                            hoverAnimation: true,
                            label: {
                                formatter: "{b}",
                                position: "right",
                                show: true
                            },
                            itemStyle: {
                                color: "#0efacc",
                                shadowBlur: 2,
                                shadowColor: "#333"
                            },
                            zlevel: 1
                        }
                    ]
                };
                this.myChart.setOption(option2);
            },
            dealWithData() {
                let geoCoordMap = {
                    杭州: [120.19, 30.26],
                    深圳: [114.07, 22.62],
                    苏州: [120.62, 31.32],
                    哈尔滨: [126.63, 45.75],
                    成都: [104.06, 30.67],
                    西安: [108.95, 34.27],
                    广州: [113.23, 23.16],
                    海门: [121.15, 31.89],
                    鄂尔多斯: [109.781327, 39.608266],
                    招远: [120.38, 37.35],
                    舟山: [122.207216, 29.985295],
                    齐齐哈尔: [123.97, 47.33],
                    盐城: [120.13, 33.38],
                    赤峰: [118.87, 42.28],
                    青岛: [120.33, 36.07],
                    乳山: [121.52, 36.89],
                    金昌: [102.188043, 38.520089],
                    泉州: [118.58, 24.93],
                    莱西: [120.53, 36.86],
                    日照: [119.46, 35.42],
                    胶南: [119.97, 35.88],
                    南通: [121.05, 32.08],
                    拉萨: [91.11, 29.97],
                    云浮: [112.02, 22.93],
                    梅州: [116.1, 24.55],
                    文登: [122.05, 37.2],
                    上海: [121.48, 31.22],
                    攀枝花: [101.718637, 26.582347],
                    威海: [122.1, 37.5],
                    承德: [117.93, 40.97],
                    厦门: [118.1, 24.46],
                    汕尾: [115.375279, 22.786211],
                    潮州: [116.63, 23.68],
                    丹东: [124.37, 40.13],
                    太仓: [121.1, 31.45],
                    曲靖: [103.79, 25.51],
                    烟台: [121.39, 37.52],
                    福州: [119.3, 26.08],
                    瓦房店: [121.979603, 39.627114],
                    即墨: [120.45, 36.38],
                    抚顺: [123.97, 41.97],
                    玉溪: [102.52, 24.35],
                    张家口: [114.87, 40.82],
                    阳泉: [113.57, 37.85],
                    莱州: [119.942327, 37.177017],
                    湖州: [120.1, 30.86],
                    汕头: [116.69, 23.39],
                    昆山: [120.95, 31.39],
                    宁波: [121.56, 29.86],
                    湛江: [110.359377, 21.270708],
                    揭阳: [116.35, 23.55],
                    荣成: [122.41, 37.16],
                    连云港: [119.16, 34.59],
                    葫芦岛: [120.836932, 40.711052],
                    常熟: [120.74, 31.64],
                    东莞: [113.75, 23.04],
                    河源: [114.68, 23.73],
                    淮安: [119.15, 33.5],
                    泰州: [119.9, 32.49],
                    南宁: [108.33, 22.84],
                    营口: [122.18, 40.65],
                    惠州: [114.4, 23.09],
                    江阴: [120.26, 31.91],
                    蓬莱: [120.75, 37.8],
                    韶关: [113.62, 24.84],
                    嘉峪关: [98.289152, 39.77313],
                    延安: [109.47, 36.6],
                    太原: [112.53, 37.87],
                    清远: [113.01, 23.7],
                    中山: [113.38, 22.52],
                    昆明: [102.73, 25.04],
                    寿光: [118.73, 36.86],
                    盘锦: [122.070714, 41.119997],
                    长治: [113.08, 36.18],
                    珠海: [113.52, 22.3],
                    宿迁: [118.3, 33.96],
                    咸阳: [108.72, 34.36],
                    铜川: [109.11, 35.09],
                    平度: [119.97, 36.77],
                    佛山: [113.11, 23.05],
                    海口: [110.35, 20.02],
                    江门: [113.06, 22.61],
                    章丘: [117.53, 36.72],
                    肇庆: [112.44, 23.05],
                    大连: [121.62, 38.92],
                    临汾: [111.5, 36.08],
                    吴江: [120.63, 31.16],
                    石嘴山: [106.39, 39.04],
                    沈阳: [123.38, 41.8],
                    茂名: [110.88, 21.68],
                    嘉兴: [120.76, 30.77],
                    长春: [125.35, 43.88],
                    胶州: [120.03336, 36.264622],
                    银川: [106.27, 38.47],
                    张家港: [120.555821, 31.875428],
                    三门峡: [111.19, 34.76],
                    锦州: [121.15, 41.13],
                    南昌: [115.89, 28.68],
                    柳州: [109.4, 24.33],
                    三亚: [109.511909, 18.252847],
                    自贡: [104.778442, 29.33903],
                    吉林: [126.57, 43.87],
                    阳江: [111.95, 21.85],
                    泸州: [105.39, 28.91],
                    西宁: [101.74, 36.56],
                    宜宾: [104.56, 29.77],
                    呼和浩特: [111.65, 40.82],
                    大同: [113.3, 40.12],
                    镇江: [119.44, 32.2],
                    桂林: [110.28, 25.29],
                    张家界: [110.479191, 29.117096],
                    宜兴: [119.82, 31.36],
                    北海: [109.12, 21.49],
                    金坛: [119.56, 31.74],
                    东营: [118.49, 37.46],
                    牡丹江: [129.58, 44.6],
                    遵义: [106.9, 27.7],
                    绍兴: [120.58, 30.01],
                    扬州: [119.42, 32.39],
                    常州: [119.95, 31.79],
                    潍坊: [119.1, 36.62],
                    重庆: [106.54, 29.59],
                    台州: [121.420757, 28.656386],
                    南京: [118.78, 32.04],
                    滨州: [118.03, 37.36],
                    贵阳: [106.71, 26.57],
                    无锡: [120.29, 31.59],
                    本溪: [123.73, 41.3],
                    克拉玛依: [84.77, 45.59],
                    渭南: [109.5, 34.52],
                    马鞍山: [118.48, 31.56],
                    宝鸡: [107.15, 34.38],
                    焦作: [113.21, 35.24],
                    句容: [119.16, 31.95],
                    北京: [116.46, 39.92],
                    徐州: [117.2, 34.26],
                    衡水: [115.72, 37.72],
                    包头: [110, 40.58],
                    绵阳: [104.73, 31.48],
                    乌鲁木齐: [87.68, 43.77],
                    枣庄: [117.57, 34.86],
                    淄博: [118.05, 36.78],
                    鞍山: [122.85, 41.12],
                    溧阳: [119.48, 31.43],
                    库尔勒: [86.06, 41.68],
                    安阳: [114.35, 36.1],
                    开封: [114.35, 34.79],
                    济南: [117, 36.65],
                    德阳: [104.37, 31.13],
                    温州: [120.65, 28.01],
                    九江: [115.97, 29.71],
                    邯郸: [114.47, 36.6],
                    临安: [119.72, 30.23],
                    兰州: [103.73, 36.03],
                    沧州: [116.83, 38.33],
                    临沂: [118.35, 35.05],
                    南充: [106.110698, 30.837793],
                    天津: [117.2, 39.13],
                    富阳: [119.95, 30.07],
                    泰安: [117.13, 36.18],
                    诸暨: [120.23, 29.71],
                    郑州: [113.65, 34.76],
                    聊城: [115.97, 36.45],
                    芜湖: [118.38, 31.33],
                    唐山: [118.02, 39.63],
                    平顶山: [113.29, 33.75],
                    邢台: [114.48, 37.05],
                    德州: [116.29, 37.45],
                    济宁: [116.59, 35.38],
                    荆州: [112.239741, 30.335165],
                    宜昌: [111.3, 30.7],
                    义乌: [120.06, 29.32],
                    丽水: [119.92, 28.45],
                    洛阳: [112.44, 34.7],
                    秦皇岛: [119.57, 39.95],
                    株洲: [113.16, 27.83],
                    石家庄: [114.48, 38.03],
                    莱芜: [117.67, 36.19],
                    常德: [111.69, 29.05],
                    保定: [115.48, 38.85],
                    湘潭: [112.91, 27.87],
                    金华: [119.64, 29.12],
                    岳阳: [113.09, 29.37],
                    长沙: [113, 28.21],
                    衢州: [118.88, 28.97],
                    廊坊: [116.7, 39.53],
                    菏泽: [115.480656, 35.23375],
                    合肥: [117.27, 31.86],
                    武汉: [114.31, 30.52],
                    大庆: [125.03, 46.58]
                };
                let data = [];
                for (let key in geoCoordMap) {
                    data.push({name: key, value: geoCoordMap[key]});
                }
                return data;
            }
        },
        mounted() {
            this.initMapChart();
        }
    }
</script>

<style lang="scss">

    .container {
        width: 100%;
        height: 100%;
        background-image: url("../assets/img/bg.png");
        padding: 0.2rem 0.2rem 0 0.2rem;
        background-size: cover;
        background-position: center center;
        /*position: absolute;*/
    }

    .box_left1 {
        /*margin-top: 15px;*/
        height: 500px;
        /*background-color: lightgray;*/
        /*background-color:rgba(128, 128, 128,0.1);*/
        /*opacity: 0.1;*/
        border-radius: 10px;
    }

    .box_left2 {
        height: 320px;
        /*background-color: lightgray;*/
        /*opacity: 0.1;*/
        border-radius: 10px;
    }

    .box_mid1 {
        height: 600px;
        /*background-color: lightgray;*/
        /*opacity: 0.1;*/
        border-radius: 10px;
    }

    .box_mid2 {
        height: 240px;
        margin-top: 5px;
        border-radius: 10px;
    }

    .box_right1 {
        height: 500px;
        /*background-color: lightgray;*/
        /*opacity: 0.1;*/
        border-radius: 10px;
    }

    .box_right2 {
        height: 320px;
        /*background-color: lightgray;*/
        /*opacity: 0.1;*/
        border-radius: 10px;
    }
</style>
