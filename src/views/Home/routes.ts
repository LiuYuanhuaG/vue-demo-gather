export default {
  path: "/HomeView",
  name: "组件测试",
  component: () => import("@/views/Home/HomeView.vue"),
  children: [
    { path: "HelloWorld", name: "Demo1", component: () => import("@/components/HelloWorld.vue") },
    // { path: "Demo2", name: "Demo2", component: () => import("@/views/HelloThree/Demo2.vue") },
  ],
}

