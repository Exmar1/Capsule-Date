import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

function Login() {
	const [username, setName] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [email, setEmail] = useState('')

	const { login } = UserAuth()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')

		try {
			const formData = new URLSearchParams()
			formData.append('username', username)
			formData.append('password', password)

			const res = await axios.post(
				'http://127.0.0.1:8000/auth/login',
				formData,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)

			const token = res.data.access_token
			localStorage.setItem('access_token', token)

			const userRes = await axios.get('http://127.0.0.1:8000/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			login(token, userRes.data)

			navigate('/')
		} catch (err) {
			console.log(err)

			if (err.response?.data?.detail) {
				setError(err.response.data.detail)
			} else {
				setError('Ошибка сети. Сервер не отвечает')
			}
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-300 via-purple-200 to-indigo-300 px-4 duration-300 flex items-center justify-center flex-col relative'>
			<div className='absolute bottom-8'>
				<p className='text-gray-800 font-medium'>
					Нет аккаунта?{' '}
					<Link className='font-bold underline text-gray-900' to={'/register'}>
						Зарегистрируйтесь
					</Link>
				</p>
			</div>

			<div className='p-8 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl min-w-[400px]'>
				<div className='flex items-center justify-center flex-col'>
					<h1 className='text-3xl font-bold mb-1.5 text-gray-800'>
						Войти в аккаунт
					</h1>
					<p className='text-gray-700 font-semibold text-md mb-4'>
						Оставь след для своей будущей личности!
					</p>
					<span className="relative text-gray-700 text-sm before:content-[''] before:absolute before:w-full before:h-px before:bg-white/40 before:left-[-120%] before:top-1/2 after:content-[''] after:absolute after:w-full after:h-px after:bg-white/40 after:right-[-120%] after:top-1/2 mb-6">
						Войти с помощью email и пароля
					</span>
				</div>

				<div className='flex items-center justify-center'>
					<form
						onSubmit={handleSubmit}
						action='#'
						method='post'
						className='w-full'
					>
						<fieldset>
							<label
								className='flex-col text-gray-800 mb-2 flex font-medium'
								htmlFor='name'
							>
								Имя
							</label>
							<input
								className='mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800'
								type='text'
								name='name'
								value={username}
								onChange={e => setName(e.target.value)}
								placeholder='Введите имя...'
								id='name'
								required
							/>
						</fieldset>

						<fieldset>
							<label
								className='flex flex-col text-gray-800 mb-2 font-medium'
								htmlFor='email'
							>
								E-mail
							</label>
							<input
								className='mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								name='mail'
								placeholder='Введите email...'
								id='email'
								required
							/>
						</fieldset>

						<fieldset>
							<label
								className='flex flex-col text-gray-800 mb-2 font-medium'
								htmlFor='password'
							>
								Пароль
							</label>
							<input
								className='mb-6 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800'
								type='password'
								name='pass'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='Введите пароль...'
								id='password'
								required
							/>
						</fieldset>
						<div className='flex items-center justify-center'>
							<button
								className='p-3 bg-gray-900 text-white w-full rounded-full font-medium hover:bg-gray-800 transition-colors'
								type='submit'
							>
								Войти
							</button>
						</div>
					</form>
				</div>
			</div>
			{error && <p className='text-lg mt-6 text-red-500'>{error}</p>}
		</div>
	)
}

export default Login
