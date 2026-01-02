import axios from 'axios'
import { useState } from 'react'

function Home() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [unlockDate, setUnlockDate] = useState('')
	const [notifyEmail, setNotifyEmail] = useState(false)
	const [error, setError] = useState('')
	const [loading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	const todayStr = new Date().toISOString().split('T')[0]

	const adjustDate = (months = 0, years = 0) => {
		const baseDate = unlockDate ? new Date(unlockDate) : new Date()

		const newDate = new Date(baseDate)

		if (months) newDate.setMonth(newDate.getMonth() + months)
		if (years) newDate.setFullYear(newDate.getFullYear() + years)

		setUnlockDate(newDate.toISOString().split('T')[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setSuccess('')

		if (!title || !content || !unlockDate) {
			setError('Пожалуйста, заполните все поля')
			return
		}

		const fullDate = new Date(unlockDate)
		if (new Date() >= fullDate) {
			setError('Выберите дату в будущем')
			return
		}

		try {
			setIsLoading(true)
			setError('')

			const token = localStorage.getItem('access_token')
			if (!token) {
				setError('Вы не авторизованы')
				return
			}

			const payload = {
				title: title,
				content: content,
				unlock_at: fullDate.toISOString(),
				notify_email: notifyEmail,
			}

			await axios.post('http://127.0.0.1:8000/capsule/create', payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setSuccess(true)
			setTitle('')
			setContent('')
			//
		} catch (err) {
			console.error(err)
			if (err.response && err.response.status === 401) {
				setError('Сессия истекла, пожалуйста войдите снова')
			} else {
				setError(err.response?.data?.detail || 'Ошибка сервера')
			}
			setError(err.response?.data?.detail || 'Ошибка сервера')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen w-full flex justify-center px-6 py-10'>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-5xl bg-white/20 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8'
			>
				<h1 className='text-4xl font-bold text-gray-900 mb-6'>
					Отправить послание в будущее
				</h1>

				<div className='mb-8'>
					<p className='block text-gray-800 font-semibold mb-2'>Тема письма</p>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Кому: Мне 30-летнему'
						className='w-full bg-transparent border-b-2 border-gray-700 focus:outline-none text-xl font-semibold text-gray-900 placeholder-gray-700 pb-1'
					/>
				</div>

				<div className='mb-8'>
					<p className='text-gray-800 font-semibold mb-3'>Когда открыть?</p>

					<div className='flex gap-3 mb-4 flex-wrap'>
						<button
							type='button'
							onClick={() => adjustDate(1, 0)}
							className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'
						>
							Через месяц
						</button>
						<button
							type='button'
							onClick={() => adjustDate(0, 1)}
							className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'
						>
							Через 1 год
						</button>
						<button
							type='button'
							onClick={() => adjustDate(0, 5)}
							className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'
						>
							Через 5 лет
						</button>
					</div>

					<div className='flex gap-4 flex-wrap'>
						<input
							type='date'
							min={todayStr}
							value={unlockDate}
							onChange={e => setUnlockDate(e.target.value)}
							className='px-4 py-2 rounded-xl bg-white/50 border border-white/50 focus:outline-none'
						/>

						<input
							type='time'
							defaultValue='13:00'
							className='px-4 py-2 rounded-xl bg-white/50 border border-white/50 focus:outline-none'
						/>
					</div>
				</div>

				<div className='mb-6'>
					<p className='block text-gray-800 font-semibold mb-2'>
						Твоё послание
					</p>

					<div className='relative'>
						<textarea
							placeholder='Напиши что-нибудь важное для своего будущего себя...'
							className='w-full h-[55vh] p-4 rounded-2xl bg-white/40 backdrop-blur border border-white/50 focus:outline-none resize-none text-gray-900'
							value={content}
							onChange={e => setContent(e.target.value)}
						/>

						<span className='absolute bottom-3 right-4 text-gray-700 text-sm'>
							{content.length} символов
						</span>
					</div>
				</div>

				<div className='flex items-center gap-2 mb-6'>
					<input
						type='checkbox'
						checked={notifyEmail}
						onChange={e => setNotifyEmail(e.target.checked)}
						className='w-5 h-5 accent-purple-700'
					/>
					<span className='text-gray-900 font-medium'>
						Отправить мне email, когда капсула откроется
					</span>
				</div>
				{success && (
					<div className='mb-6 p-4 bg-red-100 border-l-4 border-green-500 text-green-700 rounded-r'>
						<p className='font-bold'>
							Успех! Капсула запечатана. Можете ознакомиться с ней на вкладке
							Хранилище
						</p>
						<p>{success}</p>
					</div>
				)}
				{error && (
					<div className='mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r'>
						<p className='font-bold'>Ошибка</p>
						<p>{error}</p>
					</div>
				)}
				<button
					type='submit'
					className='w-full py-4 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-lg shadow-xl transition'
				>
					Запечатать капсулу
				</button>
			</form>
		</div>
	)
}

export default Home
