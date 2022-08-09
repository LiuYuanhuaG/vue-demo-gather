<template>
	<div :class="{ knowledge_upload: true, knowledge_isUpload: isUpload }">
		<div class="upload_box">
			<el-icon class="upload_box_close" v-show="isUpload" @click="handleClose">
				<Close />
			</el-icon>
			<div class="title" v-show="isUpload">上传</div>
			<DropUpload
				@change="change"
				ref="reference"
				:limit="4"
				:multiple="true"
				:onProgress="onProgress"
				:httpOption="httpOption"
				accept=".pdf,.xls,.xlsx,.docx,.doc"
			>
				<div>
					<el-radio-group
						v-model="formInline.type"
						class="ml-4"
						@click="e => e.stopPropagation()"
					>
						<el-radio :label="1" size="large">法律法规</el-radio>
						<el-radio :label="2" size="large">制度规范</el-radio>
					</el-radio-group>
				</div>
			</DropUpload>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import DropUpload from './DropUpload.vue';
// import { LOCAL_STORAGE } from '@/utils/request';

let formInline = reactive({
	type: 1,
});
let fileList = ref([]);
let reference = ref();
let isUpload = ref(false);

const token = sessionStorage.getItem('');

const change = e => {
	fileList.value = e;
};
let httpOption = reactive({
	fileKey: 'file',
	data: [
		{
			value: formInline.type,
			name: 'type',
		},
	],
	token: token ? `Bearer ${token}` : '',
	url: '/lzzApis_V2/lzz-business/knowledgeBase/add',
});

const onProgress = e => {
	let str = 'xls/xlsx/pdf/docx/doc';
	let strArr = str.split('/');
	let nameArr = e.name.split('.');
	let isOk = strArr.includes(nameArr[nameArr.length - 1]);
	let isSize = e.size / 1024 / 1024 <= 3;
	!isOk &&
		ElMessage({
			message: '只能上传xls/xlsx/pdf/docx/doc文件',
			type: 'warning',
		});
	!isSize &&
		ElMessage({
			message: '上传文件单个大小不超过3M',
			type: 'warning',
		});

	return isOk && isSize;
};

watch(fileList, e => {
	if (fileList.value.length) {
		isUpload.value = true;
	} else {
		isUpload.value = false;
	}
});
watch(
	() => formInline.type,
	e => {
		handleClose();
		httpOption.data.forEach(item => {
			item.name === 'type' && (item.value = e);
		});
	},
);

const handleClose = () => {
	isUpload.value = false;
	fileList.value = [];
	reference.value.clear();
};
</script>

<style scoped lang="scss">
.knowledge_upload {
	width: 424px;
	height: 433px !important;
	background: #ffffff;
	border-radius: 8px;

	margin: 0 auto;
	margin-top: 81px;

	.upload-demo {
		background: rgba(0, 0, 0, 0);
		border: 1px dashed #d4d6d9;
		border-radius: 8px;
	}

	.title {
		height: 25px;
		font-size: 18px;
		font-family: uniqueID∞version∞PingFang SC∞Bold;
		text-align: left;
		color: #31373d;
		line-height: 18px;
	}

	.upload_box {
		margin: 0 auto;
		width: 353px;
		height: 210px;
		position: relative;
	}
}

.knowledge_isUpload {
	box-shadow: 2px 2px 8px 0px rgba(82, 90, 102, 0.08);
}

.upload_box_close {
	position: absolute;
	top: 5px;
	right: -25px;
	cursor: pointer;
}
.ml-4 {
	margin-top: 5px;
}
</style>
