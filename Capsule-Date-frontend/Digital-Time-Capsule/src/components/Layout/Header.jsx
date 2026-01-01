import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png' // замени на правильный путь если нужно

function Header() {
	return (
		<header className='w-full px-6 py-4 sticky top-0 z-50'>
			<div
				className='w-full max-w-6xl mx-auto flex items-center justify-between
        backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl
        px-6 py-3'
			>
				<div className='flex items-center gap-3'>
					<img src={logo} alt='logo' className='w-8 h-8 object-contain' />
					<span className='text-xl font-bold text-gray-900'>TimeCapsule</span>
				</div>

				<nav className='flex items-center gap-8 text-gray-800 font-medium'>
					<Link
						to='/'
						className='hover:text-gray-950 hover:underline underline-offset-4 transition'
					>
						Главная
					</Link>

					<Link
						to='/storage'
						className='hover:text-gray-950 hover:underline underline-offset-4 transition'
					>
						Хранилище
					</Link>
				</nav>

				<div className='flex items-center gap-3 text-gray-900'>
					<div className='w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold tracking-wider'>
						TA
					</div>

					<button className='font-semibold hover:underline underline-offset-4'>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
