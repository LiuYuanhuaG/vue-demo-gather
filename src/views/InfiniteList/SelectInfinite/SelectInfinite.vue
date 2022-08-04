<template>
  <div class="select">
    <div class="s select-box">
      <div class="s select-head">
        <input ref="input_s" :value="valueRef" @click="selectClick" />
        <i class="s inputIcon" @click="selectClick"
          :style="{ transform: `rotate(${IsBodyShowRef ? '180deg' : '0deg'})`, }">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z">
            </path>
          </svg>
        </i>
      </div>

      <div class="s select-body" :style="{ display: IsBodyShowRef ? 'block' : 'none', top: 'auto' }">
        <div class="select-bar"><span></span></div>
        <div class="select-value-body">
          <div class="s search-input">
            <input ref="search_input" @change="searchChange" class="s" type="text" placeholder="搜索">
            <i class="s"></i>
          </div>
          <div class="s value-body" ref="_$refs" @scroll="scrollEvent" :style="{ height: valueBodyHeight }">
            <div class="infinite-list-phantom" :style="{ height: `${listHeight()}px` }"></div>
            <div class="select-list-body" v-if="_visibleData.length" :style="{ transform: getTransform(), }">
              <li @click="itemClick(item)" v-for="(item, i) in _visibleData" :key="i"
                :style="{ height: `${itemSize - 2}px` }">{{
                    item.title
                }}</li>
            </div>
            <div class="none" v-else>暂无匹配选项</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const value = ref('')
const props = defineProps({
  // 获取真实显示列表数据
  arr: {
    type: Array,
    default: () => []
  },
  // 列表item的高度
  itemSize: {
    type: Number,
    default: 34
  },
  // 结束索引
  end: {
    type: Number,
    default: 0
  },
  // 起始索引
  start: {
    type: Number,
    default: 0
  },
  //替换数据字段
  substitute: {
    type: Object,
    default: () => ({
      key: 'id',
      title: 'title',
      content: 'content'
    })
  },
  // 回到顶部按钮位置
  scrollTopBtnPos: {
    type: Number,
    default: 200
  },
  // 初始 选项列表高度
  visListHeight: {
    type: Number,
    default: 150
  }
})
// 可显示的列表项数
let _visibleCount = 0;
// 偏移量
let _startOffset = reactive(0);
// 起始索引
let _start = ref(props.start);
// 结束索引
let _end = ref(props.end)
// 列表item的高度
let _itemSize = reactive(props.itemSize)
// 滚动盒子实例
let _$refs = ref()

// 可视区域高度
let _screenHeight = ref(props.visListHeight)
// 是否展示列表
let IsBodyShowRef = ref(false)
// 下拉框input的值
let valueRef = ref('')
// 下拉框input元素
let input_s = ref('')
//搜索input
let search_input = ref()
//所有数据
let allData = ref(props.arr)


// 列表总高度
function listHeight () {
  return allData.value.length * _itemSize;
}

// 偏移量对应的style
function getTransform () {
  return `translate3d(0,${_startOffset}px,0)`;
}

const _visibleData = computed({
  get: () => {   // 3. 当 name 的值被修改后，触发 get 方法
    return props.arr.slice(
      _start.value,
      Math.min(_end.value, allData.value.length)
    )
  }
})


function scrollEvent (e) {
  // 当前滚动位置
  const scrollTop = _$refs.value.scrollTop;
  // 此时的开始索引
  _start.value = Math.floor(scrollTop / _itemSize);
  // 此时的结束索引
  _end.value = _start.value + _visibleCount;
  // 此时的偏移量
  _startOffset = scrollTop - (scrollTop % _itemSize);
}




const valueBodyHeight = computed({
  get: () => {   // 3. 当 name 的值被修改后，触发 get 方法
    console.log(`${_itemSize * _visibleData.value.length}px`);
    return `${_itemSize * _visibleData.value.length}px`
  }
})

// 打开列表展示
function selectClick (e) {
  e.stopPropagation();
  input_s.value && input_s.value.focus()
  IsBodyShowRef.value = !IsBodyShowRef.value
}


// 每一个元素点击
function itemClick (val) {
  valueRef.value = val.value
}

function searchChange (e) {
  let val = e.target.value
  if (!val) {
    allData.value = props.arr
  } else {
    allData.value = allData.value.filter(item => {
      var reg = new RegExp(val);
      return reg.test(item.content)
    })
    console.log(allData.value);
  }

}

// watch()

onMounted(() => {
  document.onclick = function (argument) {
    if (!argument.target.classList.contains('s')) {
      IsBodyShowRef.value = false
    }
  }
  // _screenHeight.value = _$refs.value.parentNode.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
  // if (props.arr.length * _itemSize <= props.visListHeight) {

  // }


  // 可显示的列表项数
  _visibleCount = Math.ceil(_screenHeight.value / _itemSize);

  if (
    allData.value.length < _visibleCount
  ) {
    _end.value = _start.value + allData.value.length;
  } else {
    _end.value = _start.value + _visibleCount;
  }
})
</script>


<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.select select {
  display: none;
}

.select {
  display: inline-block;
}

.select-box {
  width: 200px;
  margin: 20px 20px;
  position: relative;
}

.inputIcon {

  transition: transform .5s ease;
}

.select-head {
  position: relative;
  height: 30px;
  width: 100%;
  display: flex;
  border: solid 1px #000;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 0 1px var(--el-select-input-focus-border-color) inset !important;

  input {
    outline: none;
    border: none; //去掉默认边框
    border-radius: 5px;
    height: 100%;
    cursor: pointer;
  }

  input:focus-visible {
    border: 0px solid #eee;
  }
}

.select-head span {
  font-size: 16px;
  margin-left: 5px;
  color: FFF;
}

.select-head span.fill {
  color: #000;
}

.select-head i {
  position: absolute;
  height: 16px;
  width: 16px;
  right: 5px;
  /* background-image: url(./arrow.png); */
  background-size: 16px auto;
}

.select-body {
  display: none;
  width: 100%;
  // border: solid 1px #000;
  border-top: none;
  background-color: #F5F6FA;
  position: relative;
  transition: all .5s ease-in-out;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 0px #efefef;
}

.select-value-body {
  background-color: #fFF;
}

.search-input {
  position: relative;
  height: 40px;
  margin: 5px;
  margin-top: 0px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.774);
}

.search-input input {
  height: 30px;
  width: 150px;
  margin: 5px 8px;
  text-indent: 10px;
  padding-right: 30px;
  border: 1px solid rgba(95, 93, 93, 0.68);
  outline: none;
  border: none; //去掉默认边框
}

.search-input i {
  position: absolute;
  display: block;
  height: 20px;
  width: 20px;
  top: 12px;
  right: 15px;

  background-size: 20px 20px;
  cursor: pointer;
}

.search-input i:hover {}

.value-body {
  max-height: 150px;
  overflow: auto;
  position: relative;
}

/*修改滚动条样式*/
.value-body::-webkit-scrollbar {
  width: 15px;
  // height: 15px;'
  background: #FFF;
}

.value-body::-webkit-scrollbar-track {
  background: transparent;
}

.value-body::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 7px;
  // height: 50px;
  border: 4px solid #f1f1f1;
}

.value-body::-webkit-scrollbar-track-piece {
  width: 10px;
}

.value-body::-webkit-scrollbar-thumb:hover {
  background: #F5F6FA;
}

.value-body::-webkit-scrollbar-corner {
  background: #FFf;

}


.value-body li {
  display: flex;
  height: 24px;
  padding: 5px 5px;
  font-size: 14px;
  align-items: center;
  cursor: pointer;
}

.value-body li:hover,
li.active {
  background-color: #F5F6FA;
}

.value-body li.none,
.none {
  display: none;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;

}

.select-list-body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.select-bar {
  text-align: center;
  height: 15px;

  span {
    display: inline-block;
    width: 0px;
    height: 0px;
    border-bottom: 15px solid #fff;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }
}
</style>