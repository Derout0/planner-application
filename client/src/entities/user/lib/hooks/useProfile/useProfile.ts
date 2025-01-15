import { useQuery } from '@tanstack/react-query'

import { userService } from '../../../model/services/user/user.service'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})

	return { data, isLoading }
}
