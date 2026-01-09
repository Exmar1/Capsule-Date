import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function Layout() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-300 via-purple-200 to-indigo-300'>
			<Header />
			<main className='flex-1'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
