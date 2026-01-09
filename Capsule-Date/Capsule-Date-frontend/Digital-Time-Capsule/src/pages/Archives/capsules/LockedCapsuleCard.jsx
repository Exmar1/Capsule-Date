import React from 'react'

function LockedCapsuleCard({ capsules }) {
	const { title, unlock_at } = capsules

	const unlockDate = new Date(unlock_at)
	const now = new Date()
	const diffTime = Math.abs(unlockDate - now)
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	const dateString = unlockDate.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})

	return (
		<div className="rounded-2xl bg-gray-200/90 p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-[220px] border border-gray-300">
			<div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.03),rgba(0,0,0,0.03)_10px,transparent_10px,transparent_20px)]" />

			<div className="relative z-10">
				<div className="flex justify-between items-start mb-4">
					<h3 className="font-bold text-gray-700 text-lg leading-tight line-clamp-2 pr-2">
						{title}
					</h3>
					<span className="text-2xl opacity-70">🔒</span>
				</div>

				<div className="space-y-3 opacity-40 mb-6">
					<div className="h-2 bg-gray-500 rounded w-3/4" />
					<div className="h-2 bg-gray-500 rounded w-1/2" />
					<div className="h-2 bg-gray-500 rounded w-5/6" />
				</div>
			</div>

			<div className="relative z-10 mt-auto">
				<div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs text-gray-500 mb-3 font-medium">
					<span>Откроется: {dateString}</span>
					<span>Осталось дней: {diffDays}</span>
				</div>

				<button
					disabled
					className="w-full py-3 rounded-xl bg-gray-400/20 text-gray-500 text-sm font-bold border border-gray-400/20 cursor-not-allowed uppercase tracking-wider"
				>
					Ещё рано
				</button>
			</div>
		</div>
	)
}

export default LockedCapsuleCard
