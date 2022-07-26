export default {
  path: "/Infinite",
  name: "InfiniteListIndex",
  // redirect: '/InfiniteList/InfiniteList',
  component: () => import("@/views/InfiniteList/Index.vue"),
  children: [
    {
      path: "InfiniteList",
      name: "InfiniteList",
      component: () => import("@/views/InfiniteList/InfiniteList.vue"),
    },
  ],
}

