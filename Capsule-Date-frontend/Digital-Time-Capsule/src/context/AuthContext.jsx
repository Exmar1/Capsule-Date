import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const access_token = localStorage.getItem('access_token')

				if (!access_token) {
					setLoading(false)
					return
				}

				const res = await axios.get('http://127.0.0.1:8000/auth/me', {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})

				setUser(res.data)
				console.log('Успех', res.data)
			} catch (err) {
				console.log(err)
				setError('Auth error')
				localStorage.removeItem('access_token')
				setUser(null)
			}

			setLoading(false)
		}

		fetchAuth()
	}, [])

	const login = (access_token, userData) => {
		localStorage.setItem('access_token', access_token)
		setUser(userData)
	}

	const value = {
		user,
		isLoading,
		login,
		isAuthenticated: !!user,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const UserAuth = () => useContext(AuthContext)
