<template>
  <div style="{width: 100%;height: 100% ;}">
    <!-- <div @click=" handleChange(draw)">图片</div>
  <div @click="handleChange(init)">全景图片</div>
  <div @click="handleChange(initMu)">万花筒</div> -->
    <canvas ref="canvas" id="canvas"></canvas>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


let canvas = ref(null);
let inner = ref(1);

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
  initMu();

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  width: 100%;
  height: 100%;
}
</style>
