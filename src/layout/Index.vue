<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <Menu @steBreadcrumb='steBreadcrumb'></Menu>
    </a-layout-sider>
    <a-layout aa>
      <a-layout-header class="breadcrumb" style="background: #fff; padding: 0;margin-bottom: 10px;">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <router-link :to="item.path"> {{ item.path == '/' ? 'Home' : item.breadcrumbName }}</router-link>
          </a-breadcrumb-item>

        </a-breadcrumb>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">

        <div con :style="{ padding: '24px', background: '#fff', minHeight: '360px', height: '100%' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Menu from './Menu.vue'
let collapsed = ref<boolean>(false)
let breadcrumb = ref()

let steBreadcrumb = (val: [string]) => {
  let path: any = null
  console.log(val, 'xvxvxv');

  breadcrumb.value = val.map(item => {
    if (!path) {
      path = item
    } else {
      path = `${path}/${item}`
    }
    return {
      path,
      breadcrumbName: item == '/' ? 'Home' : item
    }
  })
  console.log(breadcrumb.value, 'va breadcrumb.valuel');

}
</script>
<style lang="scss">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.breadcrumb {
  .ant-breadcrumb {
    margin: 10px 0 0 10px;
    text-align: left;
  }
}
</style>
