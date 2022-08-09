export default {
	path: '/Infinite',
	name: 'Infinite',
	meta: {
		title: '封装组件demo',
	},
	children: [
		{
			path: '/SelectInfinite',
			name: 'SelectInfinite',
			// redirect: "/InfiniteList/InfiniteList",
			component: () => import('@/views/InfiniteList/SelectInfinite/Index.vue'),
			meta: {
				title: '下拉框无限滚动demo',
			},
		},
		{
			path: '/InfiniteList',
			name: 'InfiniteListIndex',
			component: () => import('@/views/InfiniteList/Index.vue'),
			meta: {
				title: '无限滚动demo',
			},
		},
		{
			path: '/dorpFile',
			name: 'DropUpload',
			// redirect: "/InfiniteList/InfiniteList",
			component: () => import('@/views/InfiniteList/dorpFile/Index.vue'),
			meta: {
				title: '拖拽上传文件demo',
			},
		},
	],
};
