import clsx from 'clsx'

import cls from './Pomodoro.module.scss'
import { useTimerActions } from '@/entities/pomodoro/lib/hooks/useTimerActions/useTimerActions'
import { useTodaySession } from '@/entities/pomodoro/lib/hooks/useTodaySession/useTodaySession'

import { useTimer } from '../../lib/hooks/useTimer/useTimer'

interface PomodoroProps {}

export const Pomodoro = (props: PomodoroProps) => {
	const {} = props

	const {
		setSecondsLeft,
		setIsRunning,
		setActiveRound,
		activeRound,
		secondsLeft
	} = useTimer()

	const { isLoading, isSuccess, refetch, sessionResponse } = useTodaySession({
		setActiveRound,
		setSecondsLeft
	})

	const {} = useTimerActions({
		activeRound,
		setIsRunning,
		setActiveRound,
		secondsLeft,
		rounds: sessionResponse?.data.rounds
	})

	return <div className={clsx(cls.Pomodoro)}></div>
}
