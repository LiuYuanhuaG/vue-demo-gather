export default {
  path: "/Infinite",
  name: "demo组",
  // redirect: '/InfiniteList/InfiniteList',
  component: () => import("@/views/InfiniteList/Index.vue"),
  children: [
    {
      path: "InfiniteList",
      name: "无限滚动",
      component: () => import("@/views/InfiniteList/InfiniteList.vue"),
    },
  ],
}

