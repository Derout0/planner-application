import { useQuery } from '@tanstack/react-query'

import { pomodoroService } from '../../../model/services/pomodoro/pomodoro.service'

export function usePomodoroTimer() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['pomodoro-timer'],
		queryFn: () => pomodoroService.getSettings()
	})

	return { data, isLoading, isSuccess }
}
