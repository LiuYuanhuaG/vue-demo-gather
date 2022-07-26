<template>
  <a-menu v-model:selectedKeys="selectedKeys" @select="handleChange" theme="dark" mode="inline">
    <template v-for="(item) in routerList">
      <a-menu-item v-if="!item.children" :key="item.path">
        <pie-chart-outlined />
        <span>{{ item.name }}</span>
      </a-menu-item>
      <a-sub-menu :key="item.path + ''" v-else>
        <template #title>
          <span>
            <span>{{ item.name }}</span>
          </span>
        </template>
        <a-menu-item :key="it.path" v-for="(it) in item.children">{{ it.name }}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script  lang="ts" >
import { ref, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router'
import router from '@/router';
import routes from '@/router/routes';


export default defineComponent({
  setup(props, emits) {
    // const emits = defineEmits(['steBreadcrumb'])
    const re = useRoute()

    const routerList = ref<any[]>(routes)

    let selectedKeys = ref<string[]>(['/'])
    let handleChange = (e: any) => {
      let path = e.keyPath.join('/')
      path && router.push(path)

    }
    watch(
      () => re.fullPath,
      newId => {
        // console.log(newId, selectedKeys.value, newId.split('/'), 'newId');
        if (newId == '/') {
          emits.emit('steBreadcrumb', ['/'])
          selectedKeys.value = ['/']
          return
        }
        let list = newId.split('/')
        let arr: any = []
        list.forEach((item, i) => {
          if (item) {
            if (i == 1) {
              item = `/${item}`
            }
            arr.push(item)
          }
        })
        emits.emit('steBreadcrumb', arr)
        selectedKeys.value = arr
      }
    )

    return {
      handleChange,
      selectedKeys,
      routerList
    }
  },

})


</script>

<style lang="scss">
.menu_btn {
  position: absolute;
  left: 180px;
  transition: left 400ms ease;

}

.menu_btn_l {
  left: 82px;
  transition: left 1s ease;
}
</style>