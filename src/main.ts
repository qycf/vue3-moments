// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import { isDark } from 'vue-dark-switch'

// 你自定义的 css
import './styles/main.css'

// 暗黑模式监控判断
if (isDark) {
	document.body.setAttribute('arco-theme', 'dark')
}
watch(isDark, (newIsDark) => {
	if (newIsDark) {
		document.body.setAttribute('arco-theme', 'dark')
	} else {
		document.body.removeAttribute('arco-theme')
	}
})

import App from './App.vue'

const app = createApp(App)

app.mount('#app')
