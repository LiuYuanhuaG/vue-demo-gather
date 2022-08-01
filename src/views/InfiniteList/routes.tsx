export default {
  path: "/InfiniteList",
  name: "InfiniteListIndex",
  // redirect: "/InfiniteList/InfiniteList",
  component: () => import("@/views/InfiniteList/Index.vue"),
  meta: {
    title: "InfiniteListIndex",
  },
}
