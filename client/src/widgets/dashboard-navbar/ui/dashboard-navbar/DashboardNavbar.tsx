'use client'

import clsx from 'clsx'

import cls from './DashboardNavbar.module.scss'
import { useProfile } from '@/entities/user/lib/hooks/useProfile/useProfile'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

export const DashboardNavbar = () => {
	const { data, isLoading } = useProfile()

	return (
		<header className={clsx(cls.DashboardNavbar)}>
			<HStack
				gap='12'
				align='center'
				justify='end'
			>
				<VStack>
					<Text.BodyL
						align='right'
						sx={{ fontWeight: '500' }}
					>
						{data?.user.name}
					</Text.BodyL>
					<Text.BodyM
						align='right'
						sx={{ fontWeight: '400' }}
					>
						{data?.user.email}
					</Text.BodyM>
				</VStack>
				<Text
					className={cls.avatar}
					sx={{ color: 'on-primary' }}
				>
					{data?.user.name?.charAt(0) || 'A'}
				</Text>
			</HStack>
		</header>
	)
}
