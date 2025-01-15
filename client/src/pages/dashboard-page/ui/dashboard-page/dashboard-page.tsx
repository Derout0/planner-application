import { Metadata } from 'next'

import { UserStatistics } from '@/features/user-statistics'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export const DashboardPage = () => {
	return (
		<div>
			Dashboard
			<UserStatistics />
		</div>
	)
}
