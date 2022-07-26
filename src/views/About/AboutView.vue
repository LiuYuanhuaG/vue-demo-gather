<template>
  <div class="about">
    <div @click="handleClick()">变换</div>
    <div @click="handleClicks('About')">跳转about</div>
    <div @click="handleClicks('AboutCopy')">跳转AboutCopy</div>
    <h1>This is an about page</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>
import router from '@/router';
import { useDark, useToggle, useColorMode } from '@vueuse/core'

const isDark = useDark({
  selector: 'section[aa]',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

const handleClick = () => {
  toggleDark()
}
const handleClicks = (path) => {
  console.log(path);
  router.push(`/about/${path}`)
}


console.log(toggleDark);
</script>
<style lang="scss">
body[color-scheme='dark'] {
  background-color: aquamarine;
  color: #fff
}
</style>