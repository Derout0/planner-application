import clsx from 'clsx'

import cls from './TasksBlocks.module.scss'

import { useTasks } from '../../lib/hooks/useTasks/useTasks'
import { tasksColumnsData } from '../../model/data/columns.data'
import { TaskBlock } from '../../ui/TaskBlock/TaskBlock'

export const TasksBlocks = () => {
	const { tasks, setTasks } = useTasks()

	return (
		<div className={clsx(cls.TasksBlocks)}>
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
	)
}
