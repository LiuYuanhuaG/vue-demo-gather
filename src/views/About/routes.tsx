// import { PieChartOutlined } from "@ant-design/icons-vue"

export default {
  path: "/about",
  name: "about",
  icon: "PieChartOutlined",
  component: () => import("@/views/About/AboutView.vue"),
  children: [
    {
      path: "About",
      name: "About",

      component: () => import("@/views/About/About.vue"),
    },
    {
      path: "AboutCopy",
      name: "AboutCopy",
      component: () => import("@/views/About/AboutCopy.vue"),
    },
  ],
}

