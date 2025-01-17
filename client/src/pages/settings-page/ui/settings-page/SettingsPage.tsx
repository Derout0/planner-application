'use client'

import { UpdateSettingsForm } from '@/features/update-settings'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

export function SettingsPage() {
	return (
		<VStack gap='40'>
			<Text.HeadlineH1>Settings</Text.HeadlineH1>
			<UpdateSettingsForm />
		</VStack>
	)
}
