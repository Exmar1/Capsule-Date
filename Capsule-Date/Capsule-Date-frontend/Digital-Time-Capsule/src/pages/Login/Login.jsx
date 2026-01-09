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
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			)

			const token = res.data.access_token
			localStorage.setItem('access_token', token)

			const userRes = await axios.get('http://127.0.0.1:8000/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			login(token, userRes.data)
			navigate('/')
		} catch (err) {
			if (err.response?.data?.detail) {
				setError(err.response.data.detail)
			} else {
				setError('Ошибка сети. Сервер не отвечает')
			}
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-300 via-purple-200 to-indigo-300 px-4 flex items-center justify-center relative">
			<div className="absolute bottom-6 text-center px-4">
				<p className="text-gray-800 font-medium text-sm sm:text-base">
					Нет аккаунта?{' '}
					<Link
						className="font-bold underline text-gray-900"
						to={'/register'}
					>
						Зарегистрируйтесь
					</Link>
				</p>
			</div>

			<div className="w-full max-w-md p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
				<div className="flex items-center justify-center flex-col text-center">
					<h1 className="text-2xl sm:text-3xl font-bold mb-1.5 text-gray-800">
						Войти в аккаунт
					</h1>
					<p className="text-gray-700 font-semibold text-sm sm:text-md mb-4">
						Оставь след для своей будущей личности!
					</p>
					<span className="relative text-gray-700 text-xs sm:text-sm mb-6 before:content-[''] before:absolute before:w-10 sm:before:w-full before:h-px before:bg-white/40 before:left-[-60px] sm:before:left-[-120%] before:top-1/2 after:content-[''] after:absolute after:w-10 sm:after:w-full after:h-px after:bg-white/40 after:right-[-60px] sm:after:right-[-120%] after:top-1/2">
						Войти с помощью email и пароля
					</span>
				</div>

				<form
					onSubmit={handleSubmit}
					className="w-full"
				>
					<fieldset>
						<label className="flex text-gray-800 mb-2 font-medium text-sm">
							Имя
						</label>
						<input
							className="mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							type="text"
							value={username}
							onChange={e => setName(e.target.value)}
							placeholder="Введите имя..."
							required
						/>
					</fieldset>

					<fieldset>
						<label className="flex text-gray-800 mb-2 font-medium text-sm">
							E-mail
						</label>
						<input
							className="mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Введите email..."
							required
						/>
					</fieldset>

					<fieldset>
						<label className="flex text-gray-800 mb-2 font-medium text-sm">
							Пароль
						</label>
						<input
							className="mb-6 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="Введите пароль..."
							required
						/>
					</fieldset>

					<button className="p-3 bg-gray-900 text-white w-full rounded-full font-medium hover:bg-gray-800 transition-colors">
						Войти
					</button>
				</form>

				{error && (
					<p className="text-sm mt-4 text-red-500 text-center">{error}</p>
				)}
			</div>
		</div>
	)
}

export default Login
