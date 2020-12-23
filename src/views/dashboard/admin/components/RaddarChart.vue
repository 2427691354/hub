<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 3000;

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
      default: "300px"
    }
  },
  data() {
    return {
      chart: null
    };
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

      this.chart.setOption({
        title: {
          show: true, // 显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "各公司统计", // 主标题文本，'\n'指定换行
          left: "1%", // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          top: "0", // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          textStyle: {
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: "66%",
          center: ["50%", "42%"],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)",
              opacity: 1,
              shadowBlur: 45,
              shadowColor: "rgba(0,0,0,.5)",
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: "设备数", max: 10000 },
            { name: "标识数", max: 20000 },
            { name: "xx量", max: 20000 },
            { name: "xx量", max: 20000 },
            { name: "xx量", max: 20000 },
            { name: "xx量", max: 20000 }
          ]
        },
        legend: {
          left: "center",
          bottom: "10",
          // data: ["Allocated Budget", "Expected Spending", "Actual Spending"]
          data: ["aaa公司", "bbb公司", "ccc公司"]
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000, 14000],
                name: "aaa公司"
              },
              {
                value: [4000, 9000, 15000, 15000, 13000, 11000],
                name: "bbb公司"
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: "ccc公司"
              }
            ],
            animationDuration: animationDuration
          }
        ]
      });
    }
  }
};
</script>
