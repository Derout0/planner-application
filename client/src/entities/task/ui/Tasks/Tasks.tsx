'use client'

import { DndContext, rectIntersection } from '@dnd-kit/core'
import clsx from 'clsx'

import cls from './Tasks.module.scss'
import { VStack } from '@/shared/ui/Stack'

import { useTaskDnd } from '../../lib/hooks/useTaskDnd/useTaskDnd'
import { TasksBlocks } from '../TasksBlocks/TasksBlocks'
import { TasksHeader } from '../TasksHeader/TasksHeader'

export const Tasks = () => {
	const { onDragEnd } = useTaskDnd()

	return (
		<DndContext onDragEnd={onDragEnd} collisionDetection={rectIntersection}>
			<VStack gap='4' className={clsx(cls.Tasks)}>
				<TasksHeader />
				<TasksBlocks />
			</VStack>
		</DndContext>
	)
}
