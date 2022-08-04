<template>
	<div class="container">
		<a-table
			:pagination="false"
			:columns="columns"
			:data-source="dataTable"
			:scroll="{ y: 500 }"
			bordered
		></a-table>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: '',
	setup() {
		return {
			columns: [
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					align: 'center',
				},
				{
					title: '年龄',
					dataIndex: 'age',
					key: 'age',
					align: 'center',
				},
				{
					title: '住址',
					dataIndex: 'address',
					key: 'address',
					align: 'center',
				},
			],
			dataTable: [
				{
					name: '胡彦斌',
					age: 32,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
				{
					name: '胡彦祖',
					age: 42,
					address: '西湖区湖底公园1号',
				},
			],
		};
	},
});
</script>

<style lang="less" scoped>
</style>
