import { RightOutlined } from '@ant-design/icons-vue';
export default {
  path: '/HelloCanvas',
  name: 'HelloCanvas',
  component: () => import('@/views/HelloCanvas/Index.vue'),
  meta: {
    title: "HelloCanvas",
  },
};
