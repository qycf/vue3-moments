import { createGetRoutes, setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes as fileRoutes } from 'vue-router/auto/routes'
declare module 'vue-router' {
	// 在这里定义你的 meta 类型
	// eslint-disable-next-line no-unused-vars
	interface RouteMeta {
		title?: string
		layout?: string
	}
}

export const router = createRouter({
	history: createWebHistory(),
	routes: setupLayouts(fileRoutes),
})


// 路由守卫
router.beforeEach((to, from, next) => {
	const title = import.meta.env.VITE_APP_TITLE + ' | ' + import.meta.env.VITE_APP_DESC;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
	const isAdminRoute = to.path.startsWith('/admin');

	if (isAdminRoute) {
		const user = localStorage.getItem('user');
		if (user) {
			next();
		} else {
			next('/auth/login');
		}
	} else {
		next();
	}
});


export const getRoutes = createGetRoutes(router)

export default router;
