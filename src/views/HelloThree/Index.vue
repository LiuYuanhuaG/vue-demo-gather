<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div>
  </div>

  <div id="tree" :style="`background: url(${require('@/assets/atlas.png')}) no-repeat `">

  </div>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import atlas from "@/assets/atlas.png";

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
      aa: "123",
      img: require("@/assets/atlas.png"),
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
    init2: () => {
      let mixer;

      const clock = new THREE.Clock();
      const container = document.querySelector("#tree");

      const stats = new Stats();
      container.appendChild(stats.dom);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xbfe3dd);
      scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;

      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      camera.position.set(5, 2, 8);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0.5, 0);
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("js/libs/draco/gltf/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(
        "models/gltf/LittlestTokyo.glb",
        function (gltf) {
          const model = gltf.scene;
          model.position.set(1, 1, 0);
          model.scale.set(0.01, 0.01, 0.01);
          scene.add(model);

          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();

          animate();
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );

      window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      function animate () {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        mixer.update(delta);

        controls.update();

        stats.update();

        renderer.render(scene, camera);
      }
    },
    init3: () => {
      let container, stats;

      let camera, controls, scene, renderer;

      const worldWidth = 128,
        worldDepth = 128;
      const worldHalfWidth = worldWidth / 2;
      const worldHalfDepth = worldDepth / 2;
      const data = generateHeight(worldWidth, worldDepth);

      const clock = new THREE.Clock();

      init();
      animate();

      function init () {
        container = document.querySelector("#tree");

        camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          1,
          20000
        );
        camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xbfd1e5);

        // sides

        const matrix = new THREE.Matrix4();

        const pxGeometry = new THREE.PlaneGeometry(100, 100);
        pxGeometry.attributes.uv.array[1] = 0.5;
        pxGeometry.attributes.uv.array[3] = 0.5;
        pxGeometry.rotateY(Math.PI / 2);
        pxGeometry.translate(50, 0, 0);

        const nxGeometry = new THREE.PlaneGeometry(100, 100);
        nxGeometry.attributes.uv.array[1] = 0.5;
        nxGeometry.attributes.uv.array[3] = 0.5;
        nxGeometry.rotateY(-Math.PI / 2);
        nxGeometry.translate(-50, 0, 0);

        const pyGeometry = new THREE.PlaneGeometry(100, 100);
        pyGeometry.attributes.uv.array[5] = 0.5;
        pyGeometry.attributes.uv.array[7] = 0.5;
        pyGeometry.rotateX(-Math.PI / 2);
        pyGeometry.translate(0, 50, 0);

        const pzGeometry = new THREE.PlaneGeometry(100, 100);
        pzGeometry.attributes.uv.array[1] = 0.5;
        pzGeometry.attributes.uv.array[3] = 0.5;
        pzGeometry.translate(0, 0, 50);

        const nzGeometry = new THREE.PlaneGeometry(100, 100);
        nzGeometry.attributes.uv.array[1] = 0.5;
        nzGeometry.attributes.uv.array[3] = 0.5;
        nzGeometry.rotateY(Math.PI);
        nzGeometry.translate(0, 0, -50);

        //

        const geometries = [];

        for (let z = 0; z < worldDepth; z++) {
          for (let x = 0; x < worldWidth; x++) {
            const h = getY(x, z);

            matrix.makeTranslation(
              x * 100 - worldHalfWidth * 100,
              h * 100,
              z * 100 - worldHalfDepth * 100
            );

            const px = getY(x + 1, z);
            const nx = getY(x - 1, z);
            const pz = getY(x, z + 1);
            const nz = getY(x, z - 1);

            geometries.push(pyGeometry.clone().applyMatrix4(matrix));

            if ((px !== h && px !== h + 1) || x === 0) {
              geometries.push(pxGeometry.clone().applyMatrix4(matrix));
            }

            if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
              geometries.push(nxGeometry.clone().applyMatrix4(matrix));
            }

            if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
              geometries.push(pzGeometry.clone().applyMatrix4(matrix));
            }

            if ((nz !== h && nz !== h + 1) || z === 0) {
              geometries.push(nzGeometry.clone().applyMatrix4(matrix));
            }
          }
        }

        const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
        geometry.computeBoundingSphere();

        const texture = new THREE.TextureLoader().load(atlas);
        texture.magFilter = THREE.NearestFilter;

        const mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide,
          })
        );
        scene.add(mesh);

        const ambientLight = new THREE.AmbientLight(0xcccccc);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 0.5).normalize();
        scene.add(directionalLight);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        controls = new FirstPersonControls(camera, renderer.domElement);

        controls.movementSpeed = 1000;
        controls.lookSpeed = 0.125;
        controls.lookVertical = true;

        stats = new Stats();
        container.appendChild(stats.dom);

        //

        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        controls.handleResize();
      }

      function generateHeight (width, height) {
        const data = [],
          perlin = new ImprovedNoise(),
          size = width * height,
          z = Math.random() * 100;

        let quality = 2;

        for (let j = 0; j < 4; j++) {
          if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

          for (let i = 0; i < size; i++) {
            const x = i % width,
              y = (i / width) | 0;
            data[i] += perlin.noise(x / quality, y / quality, z) * quality;
          }

          quality *= 4;
        }

        return data;
      }

      function getY (x, z) {
        return (data[x + z * worldWidth] * 0.15) | 0;
      }

      //

      function animate () {
        requestAnimationFrame(animate);

        render();
        stats.update();
      }

      function render () {
        controls.update(clock.getDelta());
        renderer.render(scene, camera);
      }
      console.timeEnd("xx");
    },
  },

  mounted () {
    this.init()
    // this.init2()
    // this.init3()
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#tree {
  min-height: 200px;
  height: 100vh;
  width: 100wh;
}

.spanss {
  color: aqua;
}

body {
  margin: 0;
}
</style>
