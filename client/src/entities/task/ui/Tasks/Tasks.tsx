'use client'

import { DndContext, DragStartEvent, rectIntersection } from '@dnd-kit/core'
import clsx from 'clsx'
import { useState } from 'react'

import cls from './Tasks.module.scss'
import { ITaskResponse } from '@/entities/task/model/types/task.types'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { useTaskDnd } from '../../lib/hooks/useTaskDnd/useTaskDnd'
import { useTasks } from '../../lib/hooks/useTasks/useTasks'
import { tasksColumnsData } from '../../model/data/columns.data'
import { TaskBlock } from '../../ui/TaskBlock/TaskBlock'

export const Tasks = () => {
	const { tasks, setTasks } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DndContext onDragEnd={onDragEnd} collisionDetection={rectIntersection}>
			<VStack gap='4' className={clsx(cls.Tasks)}>
				<div className={cls.header}>
					<Text className={cls['header-col']}></Text>
					<Text
						className={cls['header-col']}
						sx={{ fontSize: 'body-m', fontWeight: '600' }}
					>
						Task Name
					</Text>
					<Text
						className={cls['header-col']}
						sx={{ fontSize: 'body-m', fontWeight: '600' }}
					>
						Due Date
					</Text>
					<Text
						className={cls['header-col']}
						sx={{ fontSize: 'body-m', fontWeight: '600' }}
					>
						Priority
					</Text>
					<Text className={cls['header-col']}></Text>
				</div>
				<div className={cls.columns}>
					{tasksColumnsData.map(({ id, label }) => (
						<TaskBlock
							key={id}
							value={id}
							label={label}
							items={tasks}
							setItems={setTasks}
						/>
					))}
				</div>
			</VStack>
		</DndContext>
	)
}
