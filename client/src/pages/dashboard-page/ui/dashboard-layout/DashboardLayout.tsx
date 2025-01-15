import { ReactNode } from 'react'

import { HStack, VStack } from '@/shared/ui/Stack'
import { DashboardNavbar } from '@/widgets/dashboard-navbar'
import { DashboardSidebar } from '@/widgets/dashboard-sidebar'

export function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<VStack className='Dashboard'>
			<HStack flexGrow={1}>
				<DashboardSidebar />
				<VStack
					as='main'
					className='Main'
				>
					<DashboardNavbar />
					<div className='Page'>
						<div className='Container'>{children}</div>
					</div>
				</VStack>
			</HStack>
		</VStack>
	)
}
