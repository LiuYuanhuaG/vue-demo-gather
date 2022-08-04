<template>
	<div class="container">
		<a-button class="btn" type="primary" danger @click="wordBtn">
			导出word
		</a-button>
		<div class="word">
			<h1 class="title">word文档</h1>
			<p class="content">
				8月3日，中国人民解放军东部战区在台岛周边海空域组织实战化联合演训。
			</p>
			<p class="content">
				今天上午，东部战区空军出动预警机、歼击机、轰炸机等多型先进战机，从多机场战斗起飞、到多空域执行任务，开展预警指挥、干扰压制、兵力进压等。东部战区海军在台岛周边海域开展联合封控和联合对陆对海打击等多课目针对性演练
			</p>
			<p class="content">
				据中国台湾网8月4日讯
				解放军今（4日）起在台湾周边空海域进行重要军事演训行动，并组织实弹射击。据台湾《联合报》报道，台军因应情势，清晨下令台军“三军”地区轮值的战备部队，将原兵力为连级的“战斗队”，立即提升为营级的“特遣队”，实施备战警戒。
			</p>
			<p class="content">
				报道称，解放军在台海周边部署六个操演区，岛内研判可能有东风15等导弹自大陆内陆升空飞越台湾本岛上空，新竹乐山基地的长程预警雷达严密监控当面高中低空状况，并与两座岛内预警中心连线。
			</p>
			<Ecahrts ref="echarts" />
			<Table ref="table" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Ecahrts from './components/ecahrts.vue';
import Table from './components/Table.vue';
import { exportWord } from './utils';
export default defineComponent({
	name: '',
	components: {
		Ecahrts,
		Table,
	},
	setup() {
		const echarts = ref();
		const table = ref();
		const wordBtn = () => {
			const paragraph: string[] = [
				...window.document.querySelectorAll('.content'),
			].map((item: any) => {
				return item.innerText;
			});
			let img = echarts.value.echartInstance().getDataURL({
				pixelRatio: 2,
				backgroundColor: '#fff',
			});
			let contentWord = {
				p0: paragraph[0],
				p1: paragraph[1],
				p2: paragraph[2],
				p3: paragraph[3],
				img,
				dataTble: table.value.dataTable,
			};

			exportWord('word导出', contentWord);
		};
		return {
			wordBtn,
			echarts,
			table,
		};
	},
});
</script>

<style lang="less" scoped>
.container {
	margin: 0 15%;
	.btn {
		margin-bottom: 10px;
	}
	.word {
		border: 1px solid rgb(221, 11, 11);
		padding: 20px;
		.title {
			font-size: 25px;
			font-weight: 600;
		}
		.content {
			word-break: break-all;
			font-size: 15px;
			text-indent: 2em;
			text-align: left;
		}
	}
}
</style>
