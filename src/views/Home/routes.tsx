export default {
  path: "/home",
  name: "home",
  component: () => import("@/views/Home/HomeView.vue"),
  meta: {
    title: "home",
  },
}
