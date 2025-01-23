import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import cls from './TaskRow.module.scss'
import { ColumnsIds } from '@/entities/task/model/types/data.types'
import GripIcon from '@/shared/assets/icons/Grip.svg'
import TrashIcon from '@/shared/assets/icons/Trash.svg'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker'
import { Icon } from '@/shared/ui/Icon/Icon'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select/Select'
import { HStack } from '@/shared/ui/Stack'

import { useDeleteTask } from '../../lib/hooks/useDeleteTask/useDeleteTask'
import { useTaskDebounce } from '../../lib/hooks/useTaskDebounce/useTaskDebounce'
import { ITaskResponse, TaskFormState } from '../../model/types/task.types'

interface TaskRowProps {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[]>>
	taskBlockId?: ColumnsIds
}

const selectOptions = [
	{ color: 'var(--primary-color)', label: 'High', value: 'high' },
	{ color: 'var(--tertiary-color)', label: 'Medium', value: 'medium' },
	{ color: 'var(--error-color)', label: 'Low', value: 'low' }
]

export const TaskRow = (props: TaskRowProps) => {
	const { item, setItems, taskBlockId } = props
	const { attributes, listeners, transform, setNodeRef, isDragging } =
		useDraggable({
			id: item.id,
			data: { type: 'TaskRow', taskBlockId: taskBlockId, task: item }
		})

	const { register, control, watch } = useForm<TaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ itemId: item.id, watch })

	const { isDeletePending, deleteTask } = useDeleteTask()

	const onDeleteTask = () => {
		item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
	}

	const mods = {
		[cls.completed]: watch('isCompleted'),
		[cls.dragging]: isDragging
	}

	const adjustedTransform = transform
		? { ...transform, scaleY: Math.min(transform.scaleY || 1, 1) }
		: null

	const style = {
		transform: CSS.Transform.toString(adjustedTransform)
	}

	return (
		<div
			style={style}
			className={clsx(cls.TaskRow, mods)}
			ref={setNodeRef}
			{...attributes}
		>
			<div className={cls.inner}>
				<HStack className={cls.column}>
					<IconButton size='small' theme='standard' {...listeners}>
						<Icon SVG={GripIcon} />
					</IconButton>
				</HStack>
				<HStack className={cls.column} flexGrow={1} align='center'>
					<Controller
						name='isCompleted'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Checkbox
								id={'isCompleted'}
								name={'isCompleted'}
								checked={value}
								onChange={onChange}
							/>
						)}
					/>
					<Input
						className={cls.input}
						autoComplete='off'
						placeholder='Enter the name of the task...'
						{...register('name')}
					/>
				</HStack>
				<HStack className={cls.column}>
					<Controller
						name='createdAt'
						control={control}
						render={({ field: { value, onChange } }) => (
							<DatePicker
								className={cls.datepicker}
								onChange={onChange}
								value={value || ''}
							/>
						)}
					/>
				</HStack>
				<HStack className={cls.column}>
					<Controller
						name='priority'
						control={control}
						render={({ field: { value, onChange } }) => (
							<Select
								className={cls.select}
								data={selectOptions}
								onChange={onChange}
								value={value || ''}
								isColorSelect={true}
							/>
						)}
					/>
				</HStack>
				<HStack className={cls.column}>
					<IconButton
						size='small'
						theme='standard'
						disabled={isDeletePending}
						onClick={onDeleteTask}
					>
						<Icon SVG={TrashIcon} />
					</IconButton>
				</HStack>
			</div>
		</div>
	)
}
