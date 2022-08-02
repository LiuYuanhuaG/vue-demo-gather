<template>
  <div class="mapbox">
    <div id="asyncA" class="asyncA">
    </div>
    <div className="boder"></div>
    <div id="asyncB" class="asyncB">
    </div>
  </div>
</template>
<script setup>
import L from './leaflet-Plugins';
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { TD_TER_W_LEAFLET, TD_CIA_W_LEAFLET, TD_IMG_W_LEAFLET } from '../map-source'
let asyncB, asyncA;
let biaozhuA, yingxiang, shiliang, biaozhuB;
const initMap = () => {
  shiliang = L.tileLayer(TD_TER_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    zIndex: 1,
    id: 'shiliang',
    // zoomOffset: 1,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })

  // 添加天地图标注
  biaozhuA = L.tileLayer(TD_CIA_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    // zoomOffset: 1,
    id: 'biaozhu',
    zIndex: 11,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })
  yingxiang = L.tileLayer(TD_IMG_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    // zoomOffset: 1,
    id: 'yingxiang',
    zIndex: 10,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })

  asyncA = L.map('asyncA', {
    center: [33.76, 111.79],
    zoom: 11,
    maxZoom: 22,
    minZoom: 3,
    // crs: L.CRS.EPSG4326,
    zoomControl: false, // 默认不添加缩放控件
    layers: [shiliang, biaozhuA,]
  });


  // 这里必须重新声明变量 vue中因编译顺序问题无法共用
  biaozhuB = L.tileLayer(TD_CIA_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    // zoomOffset: 1,
    id: 'biaozhu',
    zIndex: 11,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })
  asyncB = L.map('asyncB', {
    center: [33.76, 111.79],
    zoom: 11,
    maxZoom: 22,
    minZoom: 3,
    // crs: L.CRS.EPSG4326,
    zoomControl: false, // 默认不添加缩放控件
    layers: [biaozhuB, yingxiang]
  });
  asyncA.sync(asyncB)
  asyncB.sync(asyncA)
}
onMounted(() => {
  initMap()
})
</script>

<style lang="scss">
.mapbox {
  height: 100%;
  width: 100%;
  display: flex;

  .asyncB,
  .asyncA {
    width: 49%;
  }

  .boder {
    width: 2px;
  }
}

.leaflet-control-container {
  .leaflet-control-attribution {
    display: none;
  }
}
</style>
