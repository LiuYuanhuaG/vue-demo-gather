// import { PieChartOutlined } from "@ant-design/icons-vue"

export default {
  path: "/about",
  name: "小功能测试",
  icon: "PieChartOutlined",
  component: () => import("@/views/About/AboutView.vue"),
  children: [
    {
      path: "About",
      name: "useHook测试",

      component: () => import("@/views/About/About.vue"),
    },
    {
      path: "AboutCopy",
      name: "useHook测试2",
      component: () => import("@/views/About/AboutCopy.vue"),
    },
  ],
}

