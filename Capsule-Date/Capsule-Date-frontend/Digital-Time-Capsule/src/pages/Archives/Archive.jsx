import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LockedCapsuleCard from './capsules/LockedCapsuleCard'
import UnlockedCapsuleCard from './capsules/UnlockedCapsuleCard'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

function Archive() {
	const [capsules, setCapsules] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchCapsules = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					'http://127.0.0.1:8000/archives/capsules/',
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				)
				const sorted = response.data.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				)
				setCapsules(sorted)
			} catch {
				setError('Не удалось загрузить архив')
			} finally {
				setLoading(false)
			}
		}
		fetchCapsules()
	}, [])

	const handleDelete = async id => {
		if (!window.confirm('Удалить капсулу навсегда?')) return

		try {
			const token = localStorage.getItem('access_token')
			await axios.delete(`http://127.0.0.1:8000/capsule/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			setCapsules(prev => prev.filter(c => c.id !== id))
		} catch {
			alert('Ошибка удаления')
		}
	}

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loader />
			</div>
		)

	if (error)
		return <div className="text-center text-red-500 mt-10">{error}</div>

	return (
		<div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8">
			<div className="max-w-7xl mx-auto bg-white/40 backdrop-blur-xl rounded-3xl p-4 sm:p-8 min-h-[50vh]">
				{capsules.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-[40vh] text-center px-4">
						<p className="text-xl sm:text-2xl text-gray-800 font-bold mb-2">
							У вас нет капсул
						</p>
						<p className="text-gray-600 text-sm sm:text-base">
							Создайте их на{' '}
							<Link
								to="/"
								className="text-indigo-700 font-semibold hover:underline"
							>
								главной странице
							</Link>
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{capsules.map(item => {
							const isUnlocked = new Date() >= new Date(item.unlock_at)
							return isUnlocked ? (
								<UnlockedCapsuleCard
									key={item.id}
									capsules={item}
									onDelete={handleDelete}
								/>
							) : (
								<LockedCapsuleCard
									key={item.id}
									capsules={item}
								/>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default Archive
