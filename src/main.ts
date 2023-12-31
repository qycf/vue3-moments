// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import { isDark } from 'vue-dark-switch'
import App from './App.vue'
// 你自定义的 css
import './styles/main.css'
import { siteSettingsReq } from './api/siteSettings'

// 暗黑模式监控判断
if (isDark.value) {
	document.body.setAttribute('arco-theme', 'dark')
} else {
	document.body.removeAttribute('arco-theme')
}
watch(isDark, (newIsDark) => {
	if (newIsDark) {
		document.body.setAttribute('arco-theme', 'dark')
	} else {
		document.body.removeAttribute('arco-theme')
	}
})


const app = createApp(App)
// 挂在isDark为全局属性
app.config.globalProperties.$isDark = isDark
app.mount('#app')
