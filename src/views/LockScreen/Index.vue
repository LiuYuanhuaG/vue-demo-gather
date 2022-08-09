<template>
  <div class="screen_root">
    <LockScreen />
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LockScreen from "./LockScreen.vue";

const emit = defineEmits([""]);
const router = useRouter();
const route = useRoute();
</script>
<style scoped lang="scss">
.screen_root {
  background: #000;
}
</style>
