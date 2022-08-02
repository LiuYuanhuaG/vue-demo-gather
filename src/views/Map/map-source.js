/**
 * leaflet地图方法
 */

// import * as L from 'leaflet'
// //  import './leaflet_wmts_layer'
// // 引入leaflet样式文件
// import 'leaflet/dist/leaflet.css'


/**
 * 3857 墨卡托投影 
 * 天地图影像图层
*/

export const TD_IMG_W_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + getTDTkey()
/**
 * 3857 墨卡托投影 
 * 天地图地形图层
*/
export const TD_TER_W_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=vec_W&x={x}&y={y}&l={z}&tk=' + getTDTkey()

/**
 * 3857 墨卡托投影 
 * 天地注记图层
*/
export const TD_CIA_W_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + getTDTkey()

/**
 * 4326 经纬度投影
 * 天地图影像图层
*/

export const TD_IMG_C_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=img_C&x={x}&y={y}&l={z}&tk=' + getTDTkey()
/**
 * 4326 经纬度投影
 *  天地图地形图层
*/

export const TD_TER_C_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=vec_C&x={x}&y={y}&l={z}&tk=' + getTDTkey()
/**
 * 4326 经纬度投影
 *  天地注记图标注图层
*/
export const TD_CIA_C_LEAFLET = 'http://{s}.tianditu.gov.cn/DataServer?T=cva_C&x={x}&y={y}&l={z}&tk=' + getTDTkey()


/**
 * 获取随机tk
*/
export function getTDTkey () {
  const TDT_KEYS = [
    '20668bac20071713cb3ed4bc5ca8c798',
    'c9f1c6dabf6aa551974969ea0a68f4df',
    '359e09124b4b02aeaf02df88f7da6689',
    '1cbdd3829c3991a80b110edbe08b91a7',
    '57afaefd3c351f564d43acfdc422799b'
  ]

  return TDT_KEYS[Math.floor(Math.random() * TDT_KEYS.length)]
}
