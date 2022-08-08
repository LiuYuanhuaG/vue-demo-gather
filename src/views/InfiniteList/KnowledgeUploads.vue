<template>
  <div :class="{ knowledge_upload: true, knowledge_isUpload: isUpload }">
    <div class="upload_box">
      <el-icon class="upload_box_close" v-show="isUpload" @click="handleClose">
        <Close />
      </el-icon>
      <div class="title" v-show="isUpload">上传</div>
      <input
        style="display: none"
        type="file"
        id="file"
        name="file"
        ref="file"
        multiple="multiple"
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
        <div class="up__text">将文件拖到此区域，或 <em>点击上传</em></div>
        <div class="up_tip">最多可上传5个附件，每个附件大小不能超过3M</div>
      </div>

      <div class="up_preview">
        <slot name="up_preview">
          <div
            class="up_preview_item"
            v-for="(item, key) in fileList"
            :key="key"
          >
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
              <span class="up_item_name">{{ item.name }}</span>
              <el-progress :percentage="50" />
            </div>
            <div class="up_item_clos">
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-78e17ca8=""
                @click="closClick(item)"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { knowledgeAdd } from "@/apis/knowledge";
let _list = [
  { name: 111 },
  { name: 111 },
  { name: 111 },
  { name: 111 },
  { name: 111 },
];
let props = defineProps({
  type: {},
});
let formInline = reactive({
  type: 1,
});
let fileList = ref([
  { name: 111 },
  { name: 111 },
  { name: 111 },
  { name: 111 },
  { name: 111 },
]);
let isUpload = ref(true);
let fileEl = ref();
let file = ref();
const onProgress = (e, f) => {
  let str = "xls/xlsx/pdf/docx/doc";
  let strArr = str.split("/");
  isUpload.value = true;
  fileList.value = f.filter((item) => {
    let nameArr = item.name.split(".");
    let isOk = strArr.includes(nameArr[nameArr.length - 1]);

    !isOk &&
      ElMessage({
        message: "只能上传xls/xlsx/pdf/docx/doc文件",
        type: "warning",
      });
    item.size / 1024 / 1024 > 3 &&
      ElMessage({
        message: "上传文件单个大小不超过3M",
        type: "warning",
      });
    return isOk;
  });
  return false;
};
const fileChange = (event) => {
  let files = event.target.files;
  let pathArr = [];
  for (const f of fileList.value) {
    pathArr.push(f);
  }
  _list = _list.concat(...files);
  fileList.value = _list;
  console.log(fileList.value, files, _list, "fileList.value");
};

const uploadFilled = (e) => {
  file.value.click();
};

const knowledgeAddFn = async (e) => {
  const [err, data] = await knowledgeAdd({
    file: e.file,
    type: formInline.type,
  });
  if (!err) {
    ElMessage({
      message: "上传成功！",
      type: "success",
    });
  }
};

const handleClose = () => {
  isUpload.value = false;
  fileList.value = [];
};

const closClick = () => {};

// 注册drop事件
const init = () => {
  fileEl.value.addEventListener("dragenter", dragover, false);
  fileEl.value.addEventListener("dragover", dragover, false);
  fileEl.value.addEventListener("dragleave", dragover, false);
  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  fileEl.value.addEventListener(
    "drop",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      let pathArr = [];
      for (const f of event.dataTransfer.files) {
        pathArr.push(f);
      }
      _list = _list.concat(...pathArr);
      fileList.value = _list;
    },
    false
  );
};

onMounted(() => {
  init();
});
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
      max-height: 50px;
      svg {
        height: 70px;
        width: 70px;
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
}
.up_box:hover {
  border: 1px dashed #387dfb;
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
  .up_preview_item:hover {
    background-color: #eee;
    .up_item_clos {
      display: block;
    }
  }
}
</style>
