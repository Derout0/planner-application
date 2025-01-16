'use client'

import clsx from 'clsx'

import cls from './DashboardNavbar.module.scss'
import { UserInfo } from '@/entities/user'

export const DashboardNavbar = () => {
	return (
		<header className={clsx(cls.DashboardNavbar)}>
			<UserInfo />
		</header>
	)
}
