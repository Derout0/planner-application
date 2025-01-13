import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { TanStackQueryProvider } from '@/app/providers/tan-stack-query'
import { WEBSITE_NAME } from '@/shared/constants/seo.constants'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: 'normal'
})

export const metadata: Metadata = {
	title: {
		default: WEBSITE_NAME,
		template: `%s | ${WEBSITE_NAME}`
	},
	description: 'Planning application'
}

export function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={zen.className}>
				<TanStackQueryProvider>
					{children}
					<Toaster
						theme={'dark'}
						position={'bottom-right'}
						duration={1500}
					/>
				</TanStackQueryProvider>
			</body>
		</html>
	)
}
