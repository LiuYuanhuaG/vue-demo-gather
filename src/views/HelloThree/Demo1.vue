<template>
  <div id="tree">
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "App",
  components: {

  },
  props: {
    aac: { type: String },
    user: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
    };
  },
  methods: {
    init: () => {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.querySelector("#tree").appendChild(renderer.domElement);

      var geometry1 = new THREE.SphereGeometry(20);
      var material1 = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        specular: 0x4488ee,
        shininess: 120,
      });
      console.log(material1);
      var cube1 = new THREE.Mesh(geometry1, material1);
      scene.add(cube1);
      cube1.translateY(60);
      cube1.translateZ(60);
      cube1.translateX(60);

      var geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体
      // var geometry = new THREE.SphereGeometry(1, 1, 1) //几何体
      var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(250);
      scene.add(axisHelper);

      function animate () {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.03;

        cube1.rotation.x += 0.02;
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
      }
      animate();
      function render () {
        renderer.render(scene, camera); //执行渲染操作
      }
      render();
      var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
      controls.addEventListener("change", render); //监听鼠标、键盘事件

      //点光源
      var point = new THREE.PointLight(0xffffff);
      point.position.set(100, 10, 200); //点光源位置
      scene.add(point); //点光源添加到场景中
    },

  },

  mounted () {
    this.init()
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.spanss {
  color: aqua;
}

body {
  margin: 0;
}
</style>
