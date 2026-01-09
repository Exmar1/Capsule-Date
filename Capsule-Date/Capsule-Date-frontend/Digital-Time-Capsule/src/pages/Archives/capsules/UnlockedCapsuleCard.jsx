import React from 'react'
import { Link } from 'react-router-dom'

function UnlockedCapsuleCard({ capsules, onDelete }) {
	const { id, title, content, created_at, unlock_at } = capsules

	const createDate = new Date(created_at).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})

	const openDate = new Date(unlock_at)
	const now = new Date()
	const isNew = now - openDate < 24 * 60 * 60 * 1000

	return (
		<div className="rounded-2xl bg-white p-6 flex flex-col justify-between shadow-lg shadow-indigo-100 relative h-full min-h-[220px] border border-white hover:-translate-y-1 transition-transform duration-300 group">
			<button
				onClick={() => onDelete(id)}
				className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-30 p-1 rounded-full hover:bg-red-50"
				title="Удалить навсегда"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>

			{isNew && (
				<span className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide z-20">
					NEW
				</span>
			)}

			<div className="relative z-10">
				<div className="flex justify-between items-start mb-2">
					<span className="text-3xl mb-3 block">📩</span>
				</div>

				<h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 leading-tight pr-8">
					{title}
				</h3>

				<p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4">
					Написано: {createDate}
				</p>

				<p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg italic border-l-2 border-blue-400 line-clamp-3">
					{content}
				</p>
			</div>

			<Link
				to={`/capsules/`}
				className="mt-6 block relative z-10"
			>
				<button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95">
					Написать новое письмо
				</button>
			</Link>
		</div>
	)
}

export default UnlockedCapsuleCard
