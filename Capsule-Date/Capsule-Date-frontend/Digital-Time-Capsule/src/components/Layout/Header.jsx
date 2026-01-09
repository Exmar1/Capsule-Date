import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { UserAuth } from '../../context/AuthContext'

function Header() {
	const { user, getInitial, logout } = UserAuth()
	const navigate = useNavigate()

	return (
		<header className="w-full px-3 sm:px-6 py-3 sticky top-0 z-50">
			<div className="w-full max-w-6xl mx-auto flex items-center justify-between backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl px-4 sm:px-6 py-3">
				<div
					onClick={() => navigate('/')}
					className="flex items-center gap-2 cursor-pointer"
				>
					<img
						src={logo}
						alt="logo"
						className="w-7 h-7 sm:w-8 sm:h-8"
					/>
					<span className="font-bold text-lg sm:text-xl text-gray-900">
						TimeCapsule
					</span>
				</div>

				<nav className="flex items-center gap-4 sm:gap-8 text-gray-800 font-medium">
					{/* Главная — ТОЛЬКО ПК */}
					<NavLink
						to="/"
						className="hidden sm:block text-sm sm:text-base hover:underline underline-offset-4"
					>
						Главная
					</NavLink>

					{/* Хранилище — всегда */}
					<NavLink
						to="/archive"
						className="text-sm sm:text-base hover:underline underline-offset-4"
					>
						Хранилище
					</NavLink>
				</nav>

				<div className="flex items-center gap-2 sm:gap-3">
					<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
						{getInitial(user?.email)}
					</div>
					<button
						onClick={logout}
						className="hidden sm:block font-semibold hover:underline underline-offset-4"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
