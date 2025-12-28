import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
	const [username, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [response, setResponse] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		setError('')

		try {
			const payload = {
				username: username,
				email: email,
				password: password,
			}

			await axios
				.post('http://127.0.0.1:8000/auth/register', payload)
				.then(response => {
					setResponse(response.data)
				})
			console.log('Успех', response.data)
		} catch (err) {
			console.log(err)
			if (err.response && err.response.data) {
				setError(err.response.data.detail)
			} else {
				setError('Ошибка Сети. Сервер не отвечает')
			}
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-300 via-purple-200 to-indigo-300 px-4 duration-300 flex items-center justify-center flex-col relative'>
			{/* Регистер блок */}
			<div className='absolute bottom-8'>
				<p className='text-gray-800 font-medium'>
					Уже есть Аккаунт?{' '}
					<Link className='font-bold underline text-gray-900' to={'/login'}>
						Войдите
					</Link>
				</p>
			</div>

			<div className='p-8 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl min-w-[400px]'>
				<div className='flex items-center justify-center flex-col'>
					<h1 className='text-3xl font-bold mb-1.5 text-gray-800'>
						Создать Аккаунт
					</h1>
					<p className='text-gray-700 font-semibold text-md mb-4'>
						Создайте аккаунт и планируйте своей будущее уже сейчас!
					</p>
					{/* Линии */}
					<span className="relative text-gray-700 text-sm before:content-[''] before:absolute before:w-full before:h-px before:bg-white/40 before:left-[-120%] before:top-1/2 after:content-[''] after:absolute after:w-full after:h-px after:bg-white/40 after:right-[-120%] after:top-1/2 mb-6">
						Зарегистрироваться с помощью email и пароля
					</span>
				</div>

				{/* Форма */}
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
								value={username}
								onChange={e => setName(e.target.value)}
								name='name'
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
								value={email}
								onChange={e => setEmail(e.target.value)}
								type='email'
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
								value={password}
								onChange={e => setPassword(e.target.value)}
								type='password'
								name='pass'
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
								Зарегистрироваться
							</button>
						</div>
					</form>
				</div>
			</div>
			{response && navigate('/')}
			{!response && <p className='text-lg mt-6 text-red-500'>{error}</p>}
		</div>
	)
}

export default Register
