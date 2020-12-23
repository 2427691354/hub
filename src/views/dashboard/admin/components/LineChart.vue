<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData, title } = {}) {
      this.chart.setOption({
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: title, // 主标题文本，'\n'指定换行
          left: "1%", // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          top: "0", // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          textStyle: {
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "normal"
          }
        },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "5%",
          top: "15%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "expected",
            smooth: true,
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#81befd" // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: "#e4f2ff" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ]), // 背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 4,
                  type: "solid",
                  color: "#0180ff" // 折线的颜色
                }
              },
              emphasis: {
                color: "#0180ff",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "dotted",
                  color: "0180ff"
                }
              }
            }, // 线条样式
            symbolSize: 5, // 折线点的大小
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {
              normal: {}
            },
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    }
  }
};
</script>
