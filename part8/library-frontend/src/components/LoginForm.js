import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Log In</h2>
      <p style={{ color: 'red' }}><strong>{error}</strong></p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm