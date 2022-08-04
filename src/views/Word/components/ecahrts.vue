<template>
	<div class="wd" ref="chart"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import useECharts from '@/hooks/echarts/useEcharts';
import 'echarts';
export default defineComponent({
	setup() {
		const chart = ref();
		const { setOption, echartInstance } = useECharts(chart);

		onMounted(() => {
			setOption({
				grid: {
					top: '10%',
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line',
					},
				],
			});
		});

		return {
			chart,
			echartInstance,
		};
	},
});
</script>
<style scoped>
.wd {
	height: 300px;
	margin: auto;
}
</style>