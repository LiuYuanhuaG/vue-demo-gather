<template>
  <div class="canvasBox">
    <canvas ref="canvas" id="canvasImg" width="1920" height="1080"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


let canvas = ref(null);
let inner = ref(1);
// 图片
const draw = () => {
  var ctx = document.getElementById("canvasImg").getContext("2d");
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, 1920, 1080);
    // ctx.drawImage(img, 500, 500, 1660, 900);
    // ctx.beginPath();
    // ctx.moveTo(30, 96);
    // ctx.lineTo(70, 66);
    // ctx.lineTo(103, 76);
    // ctx.lineTo(170, 15);
    // ctx.stroke();
  };

  img.src = require("@/assets/infinity-37896.png");
};


onMounted(() => {
  // 在这里调用
  draw();
  // init();
  // initMu();
  // draws();
  // call
});
</script>

<style scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
