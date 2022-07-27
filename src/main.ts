import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import * as ElIcons from "@element-plus/icons-vue"
import * as AntIcons from "@ant-design/icons-vue"
import Ant from "@/plugins/ant-design"

const el = createApp(App)

el.use(store)
el.use(router)
el.use(ElementPlus, {
  locale: zhCn,
})

for (const [key, component] of Object.entries(ElIcons)) {
  el.component(key, component)
}
for (const [key, component] of Object.entries(AntIcons)) {
  el.component(key, component)
}
for (const [key, component] of Object.entries(Ant)) {
  el.component(`A${key}`, component) // 因为ant 都是以a开头所以拼接上a 如若组件不生效请手动添加
}

el.mount("#app")
