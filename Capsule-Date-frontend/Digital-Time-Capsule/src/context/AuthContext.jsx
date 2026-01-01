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

	const logout = () => {
		localStorage.removeItem('access_token')
		setUser(null)
	}

	const getInitial = email => {
		if (!email) return ''

		const atIndex = email.indexOf('@')
		if (atIndex === -1) return email.substring(0, 2)

		const username = email.substring(0, atIndex)

		return username.substring(0, 2).toUpperCase()
	}

	const value = {
		user,
		isLoading,
		getInitial,
		logout,
		login,
		isAuthenticated: !!user,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const UserAuth = () => useContext(AuthContext)
