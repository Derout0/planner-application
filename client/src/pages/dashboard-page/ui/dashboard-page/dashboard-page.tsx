import { UserStatistics } from '@/features/user-statistics'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

export const DashboardPage = () => {
	return (
		<VStack gap='40'>
			<Text.HeadlineH1>Dashboard</Text.HeadlineH1>
			<UserStatistics />
		</VStack>
	)
}
