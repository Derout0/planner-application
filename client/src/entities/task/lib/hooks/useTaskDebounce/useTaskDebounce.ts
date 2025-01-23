import { debounce } from 'next/dist/server/utils'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TaskFormState } from '../../../model/types/task.types'
import { useCreateTask } from '../useCreateTask/useCreateTask'
import { useUpdateTask } from '../useUpdateTask/useUpdateTask'

export const useTaskDebounce = ({
	itemId,
	watch
}: {
	itemId: string
	watch: UseFormWatch<TaskFormState>
}) => {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TaskFormState) => {
			createTask(formData)
		}, 400),
		[]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TaskFormState) => {
			updateTask({ id: itemId, data: formData })
		}, 400),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})

		return () => unsubscribe()
	}, [watch, debounceCreateTask, debounceUpdateTask])
}
