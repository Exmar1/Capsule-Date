function Footer() {
	return (
		<footer className='w-full'>
			<div className='w-full py-10'>
				<div className='max-w-5xl mx-auto px-6 py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col items-center gap-3'>
					<p className='text-sm text-gray-800 text-center'>
						© {new Date().getFullYear()} — Сделано с любовью Exmar
					</p>

					<p className='text-xs text-gray-700 text-center'>
						Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
