import Tov from './presets'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [Tov()],
	server: {
		host: '0.0.0.0',
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
