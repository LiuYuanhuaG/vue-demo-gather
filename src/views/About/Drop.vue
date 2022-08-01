
<template>
  <div>
    <button draggable="true" :ondragstart="ondragstart">xxxxx</button>
    <div id="abouts"></div>
  </div>
</template>

<script setup >

import { onMounted } from 'vue'

const ondragstart = (e) => {
  console.log(e, 'ondragstart');
}

onMounted(() => {
  var dragged;
  document.addEventListener("dragstart", function (e) {
    // 保存拖动元素的引用 (ref.)
    dragged = e.target;
    // e.dataTransfer.setData("text/plain", JSON.stringify({ name: "emily", age: Math.random(), }));
    let str = {
      name: "emily", age: Math.random()
    }
    e.dataTransfer.setData("application/x-moz-file", JSON.stringify(str),);
    // const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    // console.log(data, 'dragstart');

    // 使其半透明
    e.target.style.opacity = .5;
    console.log(e);
  }, false);
  let dropArea = document.querySelector('#abouts')
  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event, dragged, 'dragged');
    // const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    console.log('data', event.dataTransfer.getData("application/x-moz-file"));
    // console.log(event.dataTransfer.items, 'items');
    // console.log(event.dataTransfer.getData(), 'drop');
    let pathArr = [];
    for (const f of event.dataTransfer.items) {
      console.log(f);
    }
  }, false);
  dropArea.addEventListener("dragover", e => {
    // 必须阻止默认事件，这里才会变成可释放区域。
    // 如果不写这一句，那么松手的时候，也不会触发相应的 drop 事件
    e.preventDefault();
  });
})

</script>
<style lang="scss">
.dem {
  cursor: pointer;
}

#abouts {
  height: 300px;
  background-color: aqua;
}
</style>