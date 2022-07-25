export default {
  path: '/about',
  name: 'about',
  component: () => import('@/views/About/AboutView.vue'),
  children: [{
    path: 'About',
    name: 'About',
    component: () => import('@/views/About/About.vue'),
  }, {
    path: 'AboutCopy',
    name: 'AboutCopy',
    component: () => import('@/views/About/AboutCopy.vue'),
  }]
};
