import { defineStore } from 'pinia'
import { AUTH, USER } from '~/api/auth'

export const useUserStore = defineStore('user', {
	state() {
		return {
			Authorization: '',
			userInfo: {} as USER,
		}
	},
	actions: {
		setLogin(LoginRsp: AUTH) {
			this.Authorization = LoginRsp.Authorization
			this.userInfo = LoginRsp.userInfo
		},
		setLogout() {
			this.Authorization = ''
			this.userInfo = {} as USER
			localStorage.removeItem('user')
		}
	},
	persist: true,
})
