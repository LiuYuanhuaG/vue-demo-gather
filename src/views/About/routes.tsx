import { RightOutlined } from "@ant-design/icons-vue"
export default {
  path: "/about",
  name: "about",
  meta: {
    title: "about",
    icon: <RightOutlined />,
  },
  children: [
    {
      path: "/",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
      meta: {
        title: "AboutView",
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
