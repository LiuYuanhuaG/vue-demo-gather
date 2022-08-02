import { RightOutlined } from "@ant-design/icons-vue"
export default {
  path: "/about",
  name: "about",
  meta: {
    title: "乱七八糟的操作",
    icon: <RightOutlined />,
  },
  children: [
    {
      path: "/AboutView",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
      meta: {
        title: "vueHook useDark Demo",
      },
    },
    {
      path: "/About",
      name: "About",
      component: () => import("@/views/About/About.vue"),
      meta: {
        title: "about",
      },
    },
    {
      path: "/Drop",
      name: "Drop测试",
      component: () => import("@/views/About/Drop.vue"),
      meta: {
        title: "Drop",
      },
    },
    {
      path: "/AboutCopy",
      name: "AboutCopy",
      component: () => import("@/views/About/AboutCopy.vue"),
      meta: {
        title: "AboutCopy",
      },
    },
  ],
}
