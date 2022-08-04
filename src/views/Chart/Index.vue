<template>
  <div>
    <p class="flex">
      <b>自适应测试：</b>
      <button @click="lineChartWidth = 300">300px宽</button>
      <button @click="lineChartWidth = 500">500px宽</button>
      <button @click="lineChartWidth = 800">800px宽</button>
    </p>
    <div class="wd" ref="chart" :style="{ width: `${lineChartWidth}px` }"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import useECharts from "@/hooks/echarts/useEcharts";
import "echarts";
export default defineComponent({
  setup() {
    const chart = ref();
    const lineChartWidth = ref(300);
    const { setOption } = useECharts(chart);

    onMounted(() => {
      setOption({
        grid: {
          top: "10%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    });

    return {
      chart,
      lineChartWidth,
    };
  },
});
</script>
<style scoped>
.wd {
  width: 500px;
  height: 200px;
  margin: auto;
}

.flex {
  display: flex;
  width: 300px;
  margin: auto;
  justify-content: space-around;
}
</style>