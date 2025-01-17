'use client'

import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { usePomodoroTimer } from '@/entities/pomodoro'
import { useProfile } from '@/entities/user'

import { CombinedForm } from '../../../model/types/update-settings.types'

export const useInitialData = (reset: UseFormReset<CombinedForm>) => {
	const { data: profileData, isSuccess: isProfileSuccess } = useProfile()
	const { data: pomodoroData, isSuccess: isPomodoroTimerSuccess } =
		usePomodoroTimer()

	useEffect(() => {
		if (
			isProfileSuccess &&
			profileData &&
			pomodoroData &&
			isPomodoroTimerSuccess
		) {
			reset({
				name: profileData.user.name,
				email: profileData.user.email,
				workInterval: pomodoroData.workInterval,
				breakInterval: pomodoroData.breakInterval,
				intervalsCount: pomodoroData.intervalsCount
			})
		}
	}, [isProfileSuccess, isPomodoroTimerSuccess])
}
