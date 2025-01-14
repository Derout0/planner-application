'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import cls from './auth-form.module.scss'
import { authService } from '@/features/auth'
import { AppRoutes } from '@/shared/config/pages-url.config'
import { Input } from '@/shared/ui/Input/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'

import { IAuthForm } from '../../model/types/auth.types'

export const AuthForm = () => {
	const { register, handleSubmit, reset, watch } = useForm<IAuthForm>({
		mode: 'onChange',
		defaultValues: { email: '', password: '' }
	})

	const emailValue = watch('email')
	const passwordValue = watch('password')

	const [isLoginForm, setIsLoginForm] = useState(false)
	const { push } = useRouter()

	const authHandler = (data: IAuthForm) =>
		isLoginForm ? authService.login(data) : authService.register(data)

	const onSuccessfulAuth = () => {
		toast.success('Authorization successful!')
		reset()
		push(AppRoutes.HOME)
	}

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: authHandler,
		onSuccess: onSuccessfulAuth
	})

	return (
		<form
			className={cls.AuthForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<VStack
				className={cls.inner}
				gap='28'
			>
				<Text.HeadlineH3>Auth</Text.HeadlineH3>
				<VStack gap='20'>
					<Input
						type='email'
						value={emailValue}
						label='Email'
						placeholder='Enter Email'
						autoComplete='off'
						{...register('email', { required: 'Email is required' })}
					/>
					<Input
						type='password'
						value={passwordValue}
						label='Password'
						placeholder='Enter Password'
						autoComplete='off'
						{...register('password', { required: 'Password is required' })}
					/>
				</VStack>
				<HStack
					justify='center'
					gap='20'
				>
					<button onClick={() => setIsLoginForm(true)}>Login</button>
					<button onClick={() => setIsLoginForm(false)}>Register</button>
				</HStack>
			</VStack>
		</form>
	)
}
