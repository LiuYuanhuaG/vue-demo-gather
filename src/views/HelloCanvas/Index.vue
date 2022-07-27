<template>
  <div style="{width: 100%;height: 100% ;}">
    <!-- <div @click=" handleChange(draw)">图片</div>
  <div @click="handleChange(init)">全景图片</div>
  <div @click="handleChange(initMu)">万花筒</div>
  <canvas ref="canvas" id="canvas" width="1920" height="1080"></canvas>
  <div id="item-1"></div>
  <div id="item-2"></div> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


let canvas = ref(null);
let inner = ref(1);
// 图片
const draw = () => {
  var ctx = document.getElementById("canvas").getContext("2d");
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
// 万花筒
function initMu () {
  var cn;
  //= document.getElementById('cw');
  var c;
  var u = 10;
  const m = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  window.onmousemove = function (e) {
    m.x = e.clientX;
    m.y = e.clientY;
  };
  function gc () {
    var s = "0123456789ABCDEF";
    var c = "#";
    for (var i = 0; i < 6; i++) {
      c += s[Math.ceil(Math.random() * 15)];
    }
    return c;
  }
  var a = [];
  function myfunction () {
    cn = document.getElementById("canvas");
    c = cn.getContext("2d");

    for (var i = 0; i < 10; i++) {
      var r = 30;
      var x = Math.random() * (innerWidth - 2 * r) + r;
      var y = Math.random() * (innerHeight - 2 * r) + r;
      var t = new ob(
        innerWidth / 2,
        innerHeight / 2,
        5,
        "red",
        Math.random() * 200 + 20,
        2
      );
      a.push(t);
    }
    //cn.style.backgroundColor = "#700bc8";

    c.lineWidth = "2";
    c.globalAlpha = 0.5;
    resize();
    anim();
  }
  window.onresize = function () {
    resize();
  };
  function resize () {
    cn.height = innerHeight;
    cn.width = innerWidth;
    for (var i = 0; i < 101; i++) {
      var r = 30;
      var x = Math.random() * (innerWidth - 2 * r) + r;
      var y = Math.random() * (innerHeight - 2 * r) + r;
      a[i] = new ob(
        innerWidth / 2,
        innerHeight / 2,
        4,
        gc(),
        Math.random() * 200 + 20,
        0.02
      );
    }
    //  a[0] = new ob(innerWidth / 2, innerHeight / 2, 40, "red", 0.05, 0.05);
    //a[0].dr();
  }

  function ob (x, y, r, cc, o, s) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.cc = cc;
    this.theta = Math.random() * Math.PI * 2;
    this.s = s;
    this.o = o;
    this.t = Math.random() * 150;

    this.o = o;
    this.dr = function () {
      const ls = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.s;
      this.x = m.x + Math.cos(this.theta) * this.t;
      this.y = m.y + Math.sin(this.theta) * this.t;
      c.beginPath();
      c.lineWidth = this.r;
      c.strokeStyle = this.cc;
      c.moveTo(ls.x, ls.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath();
    };
  }
  myfunction()
  function anim () {
    inner.value = requestAnimationFrame(anim);

    c.fillStyle = "rgba(0,0,0,0.05)";
    // c.fillRect(0, 0, cn.width, cn.height);
    a.forEach(function (e, i) {
      e.dr();
    });
  }
}
// 简单旋转
function draws () {
  var canvas = document.getElementById("canvas");
  let width = window.screen.width / 3,
    height = window.screen.height / 3;
  var width1 = width + (Math.random() > 0.49 ? 0.5 : -0.5);
  var height1 = height + (Math.random() > 0.49 ? 0.5 : -0.5);
  var width2 = width + (Math.random() > 0.49 ? 1.5 : -0.5);
  var height2 = height + (Math.random() > 0.49 ? 1.5 : -2.5);
  var ctx = canvas.getContext("2d");

  var a = [];
  for (var i = 0; i < 10; i++) {
    var t = new ob(
      innerWidth / 2,
      innerHeight / 2,
      8,
      gc(),
      Math.random() * 200 + 20,
      0.025
    );
    a.push(t);
  }

  anims();
  function ob (x, y, r, cc, o, s) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.cc = cc;
    this.theta = Math.random() * Math.PI * 2;
    this.s = s;
    this.o = o;
    this.t = Math.random() * 150;

    this.o = o;
    this.dr = function () {
      const ls = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.s;
      this.x = innerWidth / 2 + Math.cos(this.theta) * this.t;
      this.y = innerHeight / 2 + Math.sin(this.theta) * this.t;
      ctx.beginPath();
      ctx.lineWidth = this.r;
      ctx.strokeStyle = this.cc;
      ctx.moveTo(ls.x, ls.y);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.closePath();
    };
  }

  function gc () {
    var s = "0123456789ABCDEF";
    var c = "#";
    for (var i = 0; i < 6; i++) {
      c += s[Math.ceil(Math.random() * 15)];
    }
    return c;
  }
  function anims () {
    window.requestAnimationFrame(anims);

    if (canvas.getContext) {
      // height2 += Math.random() > 0.49 ? 0.5 : -0.5;
      // height1 += Math.random() > 0.49 ? 0.5 : -0.5;
      // width1 += Math.random() > 0.49 ? 0.5 : -0.5;
      // width2 += Math.random() > 0.49 ? 0.5 : -0.5;
      // // console.log(height1, "height1");

      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.beginPath();
      // ctx.font = "10px serif";
      // ctx.fillText("王庆昊", width1 + 13, height1 + 8);
      // ctx.fillStyle = "green";
      // ctx.fillRect(width1, height1, 10, 10);
      // // ctx.save();

      // ctx.font = "10px serif red";
      // ctx.fillText("王庆昊李", width2 + 13, height2 + 8);
      // ctx.fillStyle = "red";
      // ctx.fillRect(width2, height2, 10, 10);

      // ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      a.forEach(function (e, i) {
        e.dr();
      });
    }
  }
}

function clearCanvas (params) {
  clearInterval(inner.value)
  cancelAnimationFrame(inner.value)
  let theCanvas = document.getElementById("canvas");
  let context = theCanvas.getContext("2d");
  var w = theCanvas.width;
  var h = theCanvas.height;

  context.clearRect(0, 0, w, h);
}
function handleChange (params) {
  clearCanvas()
  params()
}

onMounted(() => {
  // 在这里调用
  // draw();
  // init();
  // initMu();
  // draws();
  // call
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 30px;
  background-color: aqua;
  color: #000;
}

#item-1 {
  animation: modle 2s;
  animation-iteration-count: infinite;
  width: 200px;
  height: 100px;
  border: 1px solid greenyellow;
}

@keyframes modle {
  0% {
    border: 1px solid greenyellow;
  }

  50% {
    border: 1px solid rgba(47, 255, 186, 0.932);
  }

  100% {
    border: 2px solid rgb(50, 47, 255);
  }
}
</style>
