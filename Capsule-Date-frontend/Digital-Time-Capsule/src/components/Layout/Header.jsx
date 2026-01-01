import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { UserAuth } from '../../context/AuthContext'

function Header() {
	const { user, getInitial, logout } = UserAuth()

	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
	}

	return (
		<header className='w-full px-6 py-4 sticky top-0 z-50'>
			<div
				className='w-full max-w-6xl mx-auto flex items-center justify-between
        backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl
        px-6 py-3'
			>
				<div onClick={handleClick} className='flex items-center gap-3'>
					<img src={logo} alt='logo' className='w-8 h-8 object-contain' />
					<span className='text-xl font-bold text-gray-900'>TimeCapsule</span>
				</div>

				<nav className='flex items-center gap-8 text-gray-800 font-medium'>
					<NavLink
						to='/'
						className='hover:text-gray-950 hover:underline underline-offset-4 transition'
					>
						Главная
					</NavLink>

					<NavLink
						to='/archive'
						className='hover:text-gray-950 hover:underline underline-offset-4 transition'
					>
						Хранилище
					</NavLink>
				</nav>

				<div className='flex items-center gap-3 text-gray-900'>
					<div className='w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold tracking-wider'>
						{getInitial(user?.email)}
					</div>
					<button
						onClick={logout}
						className='font-semibold hover:underline underline-offset-4'
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
