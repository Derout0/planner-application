import clsx from 'clsx'

import cls from './PomodoroRounds.module.scss'
import { Button } from '@/shared/ui/Button/Button'

import { IPomodoroRoundResponse } from '../../model/types/pomodoro.types'

interface PomodoroRoundsProps {
	rounds: IPomodoroRoundResponse[]
	activeRound: IPomodoroRoundResponse | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
}

export const PomodoroRounds = (props: PomodoroRoundsProps) => {
	const { rounds, activeRound, nextRoundHandler, prevRoundHandler } = props

	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false

	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	const onClickPrev = () => {
		isCanPrevRound && prevRoundHandler()
	}

	const onClickNext = () => {
		isCanPrevRound && nextRoundHandler()
	}

	return (
		<div className={clsx(cls.PomodoroRounds)}>
			<Button onClick={onClickPrev} disabled={!isCanPrevRound}>
				Prev
			</Button>
			<div>
				{rounds &&
					rounds.map(round => {
						const mods = {
							[cls.completed]: round.isCompleted,
							[cls.active]: round.id === activeRound?.id && !round.isCompleted
						}
						return <div className={clsx(cls.round, mods)}></div>
					})}
			</div>
			<Button onClick={onClickNext} disabled={!isCanNextRound}>
				Next
			</Button>
		</div>
	)
}
