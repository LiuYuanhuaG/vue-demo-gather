export default {
  path: "/HelloCanvas",
  name: "HelloCanvas",
  component: () => import("@/views/HelloCanvas/Index.vue"),
  children: [
    {
      path: "img",
      name: "Canvas图片",
      component: () => import("@/views/HelloCanvas/Img.vue"),
    },
    {
      path: "QuanJingImg",
      name: "Canvas全景图片",
      component: () => import("@/views/HelloCanvas/QuanJingImg.vue"),
    },
    {
      path: "WHT",
      name: "Canvas万花筒",
      component: () => import("@/views/HelloCanvas/WHT.vue"),
    },
  ],
}

