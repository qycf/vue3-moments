import { createGetRoutes, setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes as fileRoutes } from 'vue-router/auto/routes'
import { useSiteSettingsStore } from '~/stores/siteSettings'


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
	if (to.path.startsWith('/admin')) {
		const user = localStorage.getItem('user')
		if (user) {
			next()
		} else {
			next('/auth/login')
		}
	}
	next()
})

// 进入路由以后

router.afterEach((to, from) => {
	let siteSettings = useSiteSettingsStore()
	let title = siteSettings.siteSettings.title
	document.title = to.meta.title as string ? to.meta.title as string + ' | ' + title : title
})



export const getRoutes = createGetRoutes(router)

export default router;
