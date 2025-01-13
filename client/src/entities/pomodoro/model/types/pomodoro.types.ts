import { IBaseEntity } from '@/shared/types/root.types'

export interface IPomodoroRoundResponse extends IBaseEntity {
	isCompleted?: boolean
	totalSeconds: number
}

export interface IPomodoroSessionResponse extends IBaseEntity {
	isCompleted?: boolean
	rounds?: IPomodoroRoundResponse[]
}

export type PomodoroRoundState = Partial<
	Omit<IPomodoroRoundResponse, 'id' | 'updatedAt' | 'createdAt'>
>

export type PomodoroSessionState = Partial<
	Omit<IPomodoroSessionResponse, 'id' | 'updatedAt' | 'createdAt'>
>
