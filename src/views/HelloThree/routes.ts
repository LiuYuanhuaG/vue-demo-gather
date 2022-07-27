export default {
  path: "/HelloThree",
  name: "HelloThree",
  component: () => import("@/views/HelloThree/Index.vue"),
  children: [
    { path: "Demo1", name: "Demo1", component: () => import("@/views/HelloThree/Demo1.vue") },
    { path: "Demo2", name: "Demo2", component: () => import("@/views/HelloThree/Demo2.vue") },
  ],
}

