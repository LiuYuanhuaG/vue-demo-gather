import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import BlankLayout from "@/layout/BasicLayout/index.vue"
import Routes from "./routes"
const flatMap: any = (arr: any) => (Array.isArray(arr) ? arr.reduce((a, b) => [...a, ...flatMap(b)], []) : [arr])

const routes: Array<RouteRecordRaw> = [...flatMap(Routes)]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: BlankLayout,
      children: [...routes],
    },
    // {
    //   path: "*",
    //   component: () => import("/404.html"),
    // },
  ],
})
export default router
