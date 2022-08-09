<template>
	<div>
		<input
			style="display: none"
			type="file"
			id="file"
			name="file"
			ref="file"
			:limit="limit"
			:multiple="multiple"
			:accept="accept"
			@change="fileChange($event)"
		/>
		<div class="up_box" ref="fileEl" @click="uploadFilled">
			<div class="up_svg">
				<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="currentColor"
						d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
					></path>
				</svg>
			</div>
			<slot name="tip">
				<div class="up__text">
					将文件拖到此区域，或
					<em>点击上传</em>
				</div>
				<div class="up_tip">
					文件格式为.pdf,.xls,.xlsx,.docx,.doc，每个附件大小不能超过3M
				</div>
			</slot>
			<slot></slot>
		</div>
		<div class="up_preview">
			<slot name="up_preview">
				<div class="up_preview_item" v-for="(item, key) in fileList" :key="key">
					<svg
						viewBox="0 0 1024 1024"
						xmlns="http://www.w3.org/2000/svg"
						data-v-78e17ca8=""
					>
						<path
							fill="currentColor"
							d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
						></path>
					</svg>
					<div class="up_jd">
						<span class="up_item_name">{{ item.file.name }}</span>
						<!-- 进度条 -->
						<el-progress :percentage="item.progress" />
					</div>
					<div
						:class="{
							up_item_none: true,
							up_item_success: item.type == 'success',
							up_item_error: item.type == 'error',
						}"
					>
						<svg
							viewBox="0 0 1024 1024"
							xmlns="http://www.w3.org/2000/svg"
							v-if="item.type == 'success'"
						>
							<path
								fill="currentColor"
								d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
							></path>
							<path
								fill="currentColor"
								d="M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
							></path>
						</svg>
						<svg
							viewBox="0 0 1024 1024"
							xmlns="http://www.w3.org/2000/svg"
							v-if="item.type == 'error'"
						>
							<path
								fill="currentColor"
								d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
							></path>
							<path
								fill="currentColor"
								d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
							></path>
						</svg>
					</div>
					<div class="up_item_clos">
						<svg
							viewBox="0 0 1024 1024"
							xmlns="http://www.w3.org/2000/svg"
							data-v-78e17ca8=""
							@click="closClick(key)"
						>
							<path
								fill="currentColor"
								d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
							></path>
						</svg>
					</div>
				</div>
			</slot>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	reactive,
	onMounted,
	defineProps,
	defineEmits,
	watch,
	toRaw,
	toRefs,
	defineExpose,
} from 'vue';
import { ElMessage } from 'element-plus';
// import http, { BASE_NAME, ResponseCode } from '@/utils/request';
import axios from 'axios';
// import axios from "axios";
// 用来处理拖拽 点击上传的文件例子

let props = defineProps({
	httpOption: {
		// 网络请求相关配置 需要 url ，data ，token，file
		default: () => {
			return {};
		},
	},
	accept: {
		default: '*',
	},
	limit: {
		default: '',
	},
	multiple: {
		default: false,
	},
	onProgress: {
		default: () => {
			return () => {
				return true;
			};
		},
		type: Function,
		required: false,
	},
});
let { type, httpOption, onProgress, limit, multiple, accept } = toRefs(props);
let emit = defineEmits(['change', 'clear']);
// 上传的文件
let fileList = reactive([]);
let fileEl = ref();
let file = ref();

watch(
	fileList,
	e => {
		let aa = toRaw(e);
		emit(
			'change',
			// aa.map((item) => item.file)
			aa,
		);
		if (!httpOption.value.url) {
			emit('change', aa);
		} else {
			for (let index = 0; index < aa.length; index++) {
				const el = aa[index];

				uploadFill(el, index);
			}
		}
	},
	{
		deep: true,
	},
);

const clear = () => {
	fileList.splice(0, fileList.length);
};

// 暴露初始化数据方法
defineExpose({
	clear,
});

// 模拟点击input
const uploadFilled = e => {
	file.value.click();
};
// 上传至指定位置
const uploadFill = async ({ file, isHttp, progress, type }, i) => {
	if (isHttp) return;
	let { url, data, fileKey, token } = httpOption.value;
	const formData = new FormData();
	formData.append(fileKey, file);
	data.forEach(item => {
		formData.append(item.name, item.value);
	});

	axios({
		method: 'post',
		url,
		data: formData,
		headers: {
			Authorization: token ?? '',
			'CUSTOMIZE-CLIENT-TYPE': 'web',
		},

		onUploadProgress: progress => {
			fileList[i].progress = ((progress.loaded * 100) / progress.total).toFixed(
				0,
			);
		},
	})
		.then(res => {
			if (res.status == 200) {
				fileList[i].type = 'success';
				ElMessage({
					message: '上传成功！',
					type: 'success',
				});
			}
		})
		.catch(err => {
			ElMessage({
				message: '上传失败！',
				type: 'error',
			});
			fileList[i].type = 'error';
			fileList[i].progress = 0;
		});
	fileList[i].isHttp = true;
};

const closClick = i => {
	fileList.splice(i, 1);
};

// 注册drop事件
const init = () => {
	fileEl.value.addEventListener('dragenter', dragover, false);
	fileEl.value.addEventListener('dragover', dragover, false);
	fileEl.value.addEventListener('dragleave', dragover, false);
	function dragover(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	// 处理拖拽文件
	fileEl.value.addEventListener(
		'drop',
		event => {
			event.preventDefault();
			event.stopPropagation();
			for (const f of event.dataTransfer.files) {
				// 先通过校验
				onProgress.value(f) &&
					fileList.push({
						file: f, // 文件
						progress: 0, //进度
						isHttp: false, // 是否已上传
						type: '', // 上传状态
					});
			}
		},
		false,
	);
};

//原生input change
const fileChange = event => {
	let files = event.target.files;
	for (const f of files) {
		// 先通过校验在添加进数组
		onProgress.value(f) &&
			fileList.push({
				file: f, // 文件
				progress: 0, //进度
				isHttp: false, // 是否已上传
				type: '', // 上传状态
			});
	}
};

onMounted(() => {
	init();
});
</script>

<style scoped lang="scss">
.up_box:hover {
	border: 1px dashed #387dfb;
}

.up_box {
	height: 100%;
	background-color: rgb(245, 245, 245);
	border: 1px dashed #bbbdbf;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	cursor: pointer;
	.up_svg {
		max-height: 2.60417vw;
		svg {
			height: 3.64583vw;
			width: 3.64583vw;
		}
	}
	.up__text {
		font-size: 16px;
		margin-top: 20px;
		em {
			color: #387dfb;
			font-style: normal;
		}
	}
	.up_tip {
		font-size: 0.625vw;
		font-family: uniqueID∞version∞PingFang SC∞Medium;
		color: #bbbdbf;
		line-height: 0.625vw;
		padding: 2px;
	}
}

.ml-4 {
	margin-top: 5px;
}
.up_preview::-webkit-scrollbar {
	display: none;
}
.up_preview {
	max-height: 9.58333vw;
	overflow: auto;
	margin-top: 5px;
	.up_preview_item {
		display: flex;
		padding: 0.15625vw;
		box-shadow: 2px 2px 3px 0px rgba(82, 90, 102, 0.08);
		> svg {
			height: 1.5625vw;
			margin-right: 0.26042vw;
		}
	}
	.up_item_name {
		text-align: left;
		display: inline-block;
		width: 100%;
		// height: 15px;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.up_jd {
		flex: auto;
	}
	.up_item_clos {
		position: relative;
		display: none;
		width: 1.04167vw;
		> svg {
			position: absolute;
			top: 0;
			left: 0;
			width: 1.01167vw;
			cursor: pointer;
		}
	}
	.up_item_none {
		display: none;
		> svg {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 0;
			width: 1.01167vw;
			cursor: pointer;
		}
	}
	.up_item_success,
	.up_item_error {
		position: relative;
		display: block;
		width: 1.04167vw;
	}
	.up_item_success {
		color: greenyellow;
	}
	.up_item_error {
		color: red;
	}
	.up_preview_item:hover {
		background-color: #eee;
		border: 1px solid rgb(132, 131, 131);
		.up_item_clos {
			display: block;
		}
		.up_item_success,
		.up_item_error {
			display: none;
		}
	}
}
</style>
