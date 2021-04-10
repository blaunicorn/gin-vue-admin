<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
  import * as echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts theme
  import resize from './mixins/resize';

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart',
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '350px',
      },
      autoResize: {
        type: Boolean,
        default: true,
      },
      chartData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val);
        },
      },
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
        console.log(echarts);
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.chartData);
      },
      setOptions({ yData, xData } = {}) {
        this.chart.setOption({
          xAxis: {
            data: xData,
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            padding: [5, 10],
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            data: ['液面深度'],
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'none',
            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'none',
            },
          ],
          series: [
            {
              name: '液面深度',
              itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2,
                  },
                },
              },
              smooth: true,
              type: 'line',
              data: yData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut',
            },
          ],
        });
      },
    },
  };
</script>
