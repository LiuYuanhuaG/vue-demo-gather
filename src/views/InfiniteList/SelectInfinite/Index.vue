<template>
  <div class="box_L">
    <!-- <div @click="handleClicks('About')">跳转about</div>
    <div @click="handleClicks('AboutCopy')">跳转AboutCopy</div> -->
    <SelectInfinite :arr="arr">
      <template #content="{ itemData }">
        <div>{{ itemData.title }}</div>
      </template>
    </SelectInfinite>
  </div>
</template>

<script setup>
import router from '@/router';
import SelectInfinite from './SelectInfinite'
import { reactive } from 'vue';
let arr = reactive([])
for (let index = 0; index < 20000; index++) {
  arr.push({ id: index, value: index, title: `坤坤吃了 ${index} /碗`, content: `坤坤吃了 ${index} /碗` })
}

const handleClicks = (path) => {
  console.log(path);
  router.push(`/about/${path}`)
}

</script>
<style lang="scss">
.box_L {
  height: 100%;
}
</style>