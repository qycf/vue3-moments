import { defineStore } from 'pinia'

export default defineStore('user', {
	state() {
		return {
			isLogin: false,
			showModalRef: false,
		}
	},
	actions: {
		setLogin() {
			this.isLogin = true
		},
	},
})
