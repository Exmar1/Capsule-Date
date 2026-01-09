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
			const payload = { username, email, password }
			const res = await axios.post(
				'http://127.0.0.1:8000/auth/register',
				payload
			)
			setResponse(res.data)
		} catch (err) {
			if (err.response?.data?.detail) {
				setError(err.response.data.detail)
			} else {
				setError('Ошибка Сети. Сервер не отвечает')
			}
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-300 via-purple-200 to-indigo-300 px-4 flex items-center justify-center relative">
			<div className="absolute bottom-6 text-center px-4">
				<p className="text-gray-800 font-medium text-sm sm:text-base">
					Уже есть аккаунт?{' '}
					<Link
						className="font-bold underline text-gray-900"
						to={'/login'}
					>
						Войдите
					</Link>
				</p>
			</div>

			<div className="w-full max-w-md p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
				<div className="flex items-center justify-center flex-col text-center">
					<h1 className="text-2xl sm:text-3xl font-bold mb-1.5 text-gray-800">
						Создать аккаунт
					</h1>
					<p className="text-gray-700 font-semibold text-sm sm:text-md mb-4">
						Создайте аккаунт и планируйте будущее
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="w-full"
				>
					<fieldset>
						<label className="text-gray-800 mb-2 font-medium text-sm">
							Имя
						</label>
						<input
							className="mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							value={username}
							onChange={e => setName(e.target.value)}
							placeholder="Введите имя..."
							required
						/>
					</fieldset>

					<fieldset>
						<label className="text-gray-800 mb-2 font-medium text-sm">
							E-mail
						</label>
						<input
							className="mb-4 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Введите email..."
							required
						/>
					</fieldset>

					<fieldset>
						<label className="text-gray-800 mb-2 font-medium text-sm">
							Пароль
						</label>
						<input
							className="mb-6 p-3 w-full rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 text-gray-800"
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							placeholder="Введите пароль..."
							required
						/>
					</fieldset>

					<button className="p-3 bg-gray-900 text-white w-full rounded-full font-medium hover:bg-gray-800 transition-colors">
						Зарегистрироваться
					</button>
				</form>

				{!response && error && (
					<p className="text-sm mt-4 text-red-500 text-center">{error}</p>
				)}
				{response && navigate('/')}
			</div>
		</div>
	)
}

export default Register
