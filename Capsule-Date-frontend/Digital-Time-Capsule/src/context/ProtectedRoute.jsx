import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { UserAuth } from './AuthContext'

const ProtectedRouter = ({ children }) => {
	const { user, isAuthenticated, isLoading } = UserAuth()

	const location = useLocation()

	if (isLoading) {
		return (
			<div className='items-center justify-center h-[100vh] flex text-2xl'>
				<Loader />
			</div>
		)
	}

	if (!isAuthenticated || (user && !user.is_active)) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRouter
