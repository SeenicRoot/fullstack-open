import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ className }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
    }
    catch (exception) {
      dispatch(setNotification('wrong username or password', true, 3000))
      setPassword('')
    }
  }

  className += ' login-form'

  return (
    <form className={ className } onSubmit={handleLogin}>
      <div style={{ display: 'inline' }}>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div style={{ display: 'inline' }}>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button id="login-button" type="submit">log in</button>
    </form>
  )
}

export default LoginForm