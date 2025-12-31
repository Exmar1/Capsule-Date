import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRouter from './context/ProtectedRoute'
import Archive from './pages/Archives/Archive'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},

	{
		path: '/',
		element: (
			<ProtectedRouter>
				<Layout />
			</ProtectedRouter>
		),
		children: [
			{
				index: true,
				element: (
					<ProtectedRouter>
						<Home />
					</ProtectedRouter>
				),
			},
			{
				path: 'archive',
				element: (
					<ProtectedRouter>
						<Archive />
					</ProtectedRouter>
				),
			},
			{
				path: '*',
				element: (
					<ProtectedRouter>
						<Home />
					</ProtectedRouter>
				),
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
