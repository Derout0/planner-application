import { $axiosAuth } from '@/shared/api/interceptors'

import { IProfileResponse, UserForm } from '../../types/user'

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		const response = await $axiosAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: UserForm) {
		const response = await $axiosAuth.put(this.BASE_URL, data)
		return response.data
	}
}

export const userSerice = new UserService()
