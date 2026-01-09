function Footer() {
	return (
		<footer className="w-full px-4 pb-6">
			<div className="max-w-5xl mx-auto px-4 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-center">
				<p className="text-sm text-gray-800">
					© {new Date().getFullYear()} — Exmar
				</p>
				<p className="text-xs text-gray-700 mt-1">Все права защищены</p>
			</div>
		</footer>
	)
}

export default Footer
