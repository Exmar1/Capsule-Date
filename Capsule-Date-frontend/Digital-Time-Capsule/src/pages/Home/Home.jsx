function Home() {
	return (
		<div className='min-h-screen w-full flex justify-center px-6 py-10'>
			<div className='w-full max-w-5xl bg-white/20 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8'>
				<h1 className='text-4xl font-bold text-gray-900 mb-6'>
					Отправить послание в будущее
				</h1>

				<div className='mb-8'>
					<p className='block text-gray-800 font-semibold mb-2'>Тема письма</p>
					<input
						type='text'
						placeholder='Кому: Мне 30-летнему'
						className='w-full bg-transparent border-b-2 border-gray-700 focus:outline-none text-xl font-semibold text-gray-900 placeholder-gray-700 pb-1'
					/>
				</div>

				<div className='mb-8'>
					<p className='text-gray-800 font-semibold mb-3'>Когда открыть?</p>

					<div className='flex gap-3 mb-4 flex-wrap'>
						<button className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'>
							Через месяц
						</button>
						<button className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'>
							Через 1 год
						</button>
						<button className='px-4 py-2 bg-white/40 hover:bg-white/60 transition rounded-full text-gray-900 font-medium'>
							Через 5 лет
						</button>
					</div>

					<div className='flex gap-4 flex-wrap'>
						<input
							type='date'
							className='px-4 py-2 rounded-xl bg-white/50 border border-white/50 focus:outline-none'
						/>

						<input
							type='time'
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
						/>

						<span className='absolute bottom-3 right-4 text-gray-700 text-sm'>
							0 символов
						</span>
					</div>
				</div>

				<div className='flex items-center gap-2 mb-6'>
					<input type='checkbox' className='w-5 h-5 accent-purple-700' />
					<span className='text-gray-900 font-medium'>
						Отправить мне email, когда капсула откроется
					</span>
				</div>

				<button className='w-full py-4 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-lg shadow-xl transition'>
					Запечатать капсулу ⏳
				</button>
			</div>
		</div>
	)
}

export default Home
