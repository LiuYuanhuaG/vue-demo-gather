<template>
  <ConfigProvider :locale="locale">
    <Layout></Layout>
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ref } from 'vue'
import { ConfigProvider } from 'ant-design-vue';
import Layout from '@/layout/Index.vue'

dayjs.locale('zh-cn');

const locale = ref(zhCN)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
