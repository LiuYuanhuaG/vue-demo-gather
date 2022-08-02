<template>
  <a-layout-header class="header">
    <div class="logo-wrap">
      <router-link :to="{ path: '/home' }">
        <span class="subTitle">回到首页</span>
      </router-link>
    </div>
    <div>
      <RightContent />
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import RightContent from './RightContent.vue';
</script>
<style lang="less" scoped>
.header {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 100%;
  height: 80px;
  background: #ffffff;
  box-shadow: 0 1px 4px #00152914;

  .logo-wrap {
    height: 100%;

    a {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .title {
      margin: 0;
      margin-left: 12px;
      color: #000000;
      font-size: 18px;
    }

    .logo {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
