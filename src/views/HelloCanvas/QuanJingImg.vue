<template>
  <div class="canvasBox">
    <canvas ref="canvas" id="canvas" width="1920" height="1080"></canvas>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


let canvas = ref(null);
let inner = ref(1);

// 全景图片
function init () {
  var img = new Image();

  // User Variables - customize these to change the image being scrolled, its
  // direction, and the speed.

  img.src = require("@/assets/infinity-37896.png");
  var CanvasXSize = 800;
  var CanvasYSize = 200;
  var speed = 30; // lower is faster
  var scale = 1.05;
  var y = -4.5; // vertical offset

  // Main program

  var dx = 0.75;
  var imgW;
  var imgH;
  var x = 0;
  var clearX;
  var clearY;
  let ctx;
  img.onload = function () {
    imgW = 1920;
    imgH = 1080;

    if (imgW > CanvasXSize) {
      // image larger than canvas
      x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
      // image width larger than canvas
      clearX = imgW;
    } else {
      clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
      // image height larger than canvas
      clearY = imgH;
    } else {
      clearY = CanvasYSize;
    }

    // get canvas context
    ctx = document.getElementById("canvas").getContext("2d");

    // set refresh rate
    // window.cancelAnimationFrame(draws);
    inner.value = setInterval(draws, speed);
    return inner.value;
  };

  function draws () {
    ctx && ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
      // reset, start from beginning
      if (x > CanvasXSize) {
        x = -imgW + x;
      }
      // draw additional image1
      if (x > 0) {
        ctx.drawImage(img, -imgW + x, y, imgW, imgH);
      }
      // draw additional image2
      if (x - imgW > 0) {
        ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
      }
    }

    // image is > Canvas Size
    else {
      // reset, start from beginning
      if (x > CanvasXSize) {
        x = CanvasXSize - imgW;
      }
      // draw aditional image
      if (x > CanvasXSize - imgW) {
        ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
      }
    }
    // draw image
    ctx.drawImage(img, x, y, imgW, imgH);
    // amount to move
    x += dx;
  }
}
onMounted(() => {

  init();

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.canvasBox {
  width: 100%;
  height: 100%;
  overflow: auto;

  #canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
