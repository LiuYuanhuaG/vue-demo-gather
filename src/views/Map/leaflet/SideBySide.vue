<template>
  <!-- leaflet 地图容器 -->
  <div id="myMap"></div>
</template>
<script setup>
import L from './leaflet-Plugins';
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { TD_TER_W_LEAFLET, TD_CIA_W_LEAFLET, TD_IMG_W_LEAFLET } from '../map-source'

const initMap = () => {
  var shiliang = L.tileLayer(TD_TER_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    zIndex: 11,
    id: 'shiliang',
    // zoomOffset: 1,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })

  // 添加天地图标注
  var biaozhu = L.tileLayer(TD_CIA_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    // zoomOffset: 1,
    id: 'biaozhu',
    zIndex: 11,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })
  var yingxiang = L.tileLayer(TD_IMG_W_LEAFLET, {
    maxZoom: 20,
    tileSize: 256,
    // zoomOffset: 1,
    id: 'biaozhu',
    zIndex: 11,
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })
  var map = L.map('myMap', {
    center: [33.76, 111.79],
    zoom: 11,
    maxZoom: 22,
    minZoom: 3,
    // crs: L.CRS.EPSG4326,
    zoomControl: false, // 默认不添加缩放控件
    layers: [shiliang, biaozhu, yingxiang,]
  });
  L.control.sideBySide(yingxiang, shiliang).addTo(map);
}
onMounted(() => {
  initMap()
})
</script>

<style lang="scss">
#myMap {
  height: 100%;


}

.leaflet-control-container {
  .leaflet-control-attribution {
    display: none;
  }
}
</style>
