import { GlobalOutlined } from "@ant-design/icons-vue"
import LeafletLogo from "./leaflet/Index"
export default {
  path: "/Map",
  name: "Map",
  meta: {
    title: "地图框架测试",
    icon: <GlobalOutlined></GlobalOutlined>,
  },
  children: [
    {
      path: "/leaflet",
      name: "leaflet",
      meta: {
        title: "leaflet测试",
        icon: <LeafletLogo></LeafletLogo>,
      },
      children: [
        {
          path: "/SideBySide",
          name: "SideBySide",
          component: () => import("@/views/Map/leaflet/SideBySide.vue"),
          meta: {
            title: "卷帘效果测试",
          },
        },
        {
          path: "/LeafletSync",
          name: "LeafletSync",
          component: () => import("@/views/Map/leaflet/LeafletSync.vue"),
          meta: {
            title: "地图同步效果测试",
          },
        },
      ],
    },
  ],
}
