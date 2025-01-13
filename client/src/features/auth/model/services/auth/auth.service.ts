import { $axiosBase } from '@/shared/api/interceptors'
import {
	removeAccessTokenFromStorage,
	saveAccessTokenToStorage
} from '@/shared/services/auth-token.service'

import { IAuthForm, IAuthResponse } from '../../types/auth.types'

class AuthService {
	private LOGIN_URL = '/auth/login'
	private REGISTER_URL = '/auth/register'
	private LOGOUT_URL = '/auth/logout'
	private REFRESH_TOKENS_URL = '/auth/login/access-token'

	async login(data: IAuthForm) {
		const response = await $axiosBase.post<IAuthResponse>(this.LOGIN_URL, data)
		const { accessToken } = response.data

		if (accessToken) saveAccessTokenToStorage(accessToken)

		return response
	}

	async register(data: IAuthForm) {
		const response = await $axiosBase.post<IAuthResponse>(
			this.REGISTER_URL,
			data
		)
		const { accessToken } = response.data

		if (accessToken) saveAccessTokenToStorage(accessToken)

		return response
	}

	async logout() {
		const response = await $axiosBase.post<boolean>(this.LOGOUT_URL)
		if (response.data) removeAccessTokenFromStorage()

		return response
	}

	async getNewTokens() {
		const response = await $axiosBase.post<IAuthResponse>(
			this.REFRESH_TOKENS_URL
		)
		const { accessToken } = response.data

		if (accessToken) saveAccessTokenToStorage(accessToken)

		return response
	}
}

export const authService = new AuthService()
