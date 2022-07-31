import { RightOutlined } from '@ant-design/icons-vue';
export default {
  path: '/InfiniteList',
  name: 'InfiniteListIndex',
  // redirect: '/InfiniteList/InfiniteList',
  component: () => import('@/views/InfiniteList/Index.vue'),
  meta: {
    title: "InfiniteListIndex",
  },
  children: [{
    path: 'InfiniteList',
    name: 'InfiniteList',
    component: () => import('@/views/InfiniteList/InfiniteList.vue'),
    meta: {
      title: "InfiniteList",

    },
  }]
};
