import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Routes from "./routes"
const flatMap: any = (arr: any) => (Array.isArray(arr) ? arr.reduce((a, b) => [...a, ...flatMap(b)], []) : [arr])

const routes: Array<RouteRecordRaw> = [...flatMap(Routes)]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router

