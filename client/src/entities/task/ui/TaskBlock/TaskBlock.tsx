import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import cls from './TaskBlock.module.scss'
import { tasksFilters } from '@/entities/task/model/data/columns.data'
import { TaskAddInput } from '@/entities/task/ui/TaskAddInput/TaskAddInput'
import { TaskRow } from '@/entities/task/ui/TaskRow/TaskRow'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { filterTasks } from '../../lib/utils/filter-tasks/filter-tasks'
import { ColumnsIds } from '../../model/types/data.types'
import { ITaskResponse } from '../../model/types/task.types'

interface TaskBlockProps {
	value: ColumnsIds
	label: string
	items: ITaskResponse[]
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
}

export const TaskBlock = (props: TaskBlockProps) => {
	const { value, label, items, setItems } = props
	const { setNodeRef, isOver } = useDroppable({
		id: value,
		data: {
			type: 'TaskBlock'
		}
	})

	const mods = {
		[cls.dragging]: isOver
	}

	return (
		<VStack ref={setNodeRef} className={clsx(cls.TaskBlock, mods)}>
			<Text
				className={cls.title}
				sx={{ fontSize: 'body-l', fontWeight: '600' }}
			>
				{label}
			</Text>
			<VStack className={cls.rows} gap='4'>
				{filterTasks(items, value)?.map(item => {
					return (
						<TaskRow
							key={item.id}
							taskBlockId={value}
							item={item}
							setItems={setItems}
						/>
					)
				})}
				{value !== ColumnsIds.COMPLETED && !items?.some(item => !item.id) && (
					<HStack justify='start'>
						<TaskAddInput
							setItems={setItems}
							filterDate={
								tasksFilters[value] ? tasksFilters[value].format() : undefined
							}
						/>
					</HStack>
				)}
			</VStack>
		</VStack>
	)
}
