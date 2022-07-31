<template>
  <div class="infinite-list-container" @scroll="scrollEvent" ref="_$refs">
    <div class="scrollTopBtn" @click="scrollToTop" v-show="_end > scrollTopBtnPos" title="回到顶部">
      <!-- 回到顶部 -->
      <slot name="scrollTopBtn"> <img src="@/assets/kk.jpg" alt="" /></slot>
    </div>
    <div class="infinite-list-phantom" :style="{ height: `${listHeight()}px` }"></div>
    <div class="infinite-list" :style="{ transform: getTransform() }">
      <div class="infinite-list-item" v-for="item in _visibleData" :key="item[substitute?.key]"
        :style="{ height: _itemSize + 'px', lineHeight: _itemSize + 'px' }">
        <!-- 这里可以完全自定义内部 -->
        <slot name="content" :itemData="item">
          <div class="left-section">
            {{ item[substitute?.title] }}
          </div>
          <div class="right-section">
            <div class="title">{{ item[substitute?.title] }}</div>
            <div class="desc">{{ item[substitute?.content] }}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup >
import { reactive, ref, defineProps, computed, onMounted } from 'vue'

const props = defineProps({
  // 获取真实显示列表数据
  arr: {
    type: Array,
    default: () => []
  },
  // 列表item的高度
  itemSize: {
    type: Number,
    default: 50
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
let _screenHeight = ref(0)

// 列表总高度
function listHeight () {
  return props.arr.length * _itemSize;
}
console.log(listHeight());
// 偏移量对应的style
function getTransform () {
  return `translate3d(0,${_startOffset}px,0)`;
}

function scrollToTop () {
  _$refs.value.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

const _visibleData = computed({
  get: () => {   // 3. 当 name 的值被修改后，触发 get 方法
    return props.arr.slice(
      _start.value,
      Math.min(_end.value, props.arr.length)
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

onMounted(() => {
  console.log(_$refs.value.parentNode.clientHeight);
  _screenHeight.value = _$refs.value.parentNode.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
  // 可显示的列表项数
  _visibleCount = Math.ceil(_screenHeight.value / _itemSize);

  _end.value = _start.value + _visibleCount;
})

</script>

<style lang="scss">
.scrollTopBtn {
  position: fixed;
  border-radius: 50%;
  font-size: 12px;
  color: #eee;
  /* background: url('@/assets/kk.jpg'); */
  background-size: 100% 100%;
  bottom: 101px;
  right: 30px;
  z-index: 10000;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
}

.infinite-list-container {
  margin-top: 10px;
  height: 99%;
  overflow: scroll;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  background: white;
  box-shadow: 0 0 10px rgba(144, 144, 144, 0.15);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
  margin-top: 10px;
}


.left-section {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  font-weight: bold;
  color: white;
  background: #6ab6fc;
  border-radius: 10px;
}

.right-section {
  height: 100%;
  margin-left: 20px;
  flex: 1;

}

.title {
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  height: 14px;
}

.desc {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  height: 12px;

}
</style>
