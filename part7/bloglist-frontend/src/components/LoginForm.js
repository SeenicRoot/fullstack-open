import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { loginUser } from '../reducers/loginReducer'
// import { setNotification } from '../reducers/notificationReducer'

import {
  Form,
  Modal,
  Button,
  Message
} from 'semantic-ui-react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      setLoginError(false)
      setLoginOpen(false)
    }
    catch (exception) {
      setLoginError(true)
      setPassword('')
    }
  }

  return (
    <Modal
      onClose={() => {
        setLoginError(false)
        setLoginOpen(false)
      }}
      onOpen={() => setLoginOpen(true)}
      open={loginOpen}
      trigger={<Button>Log in</Button>}
    >
      {loginError ?
        <Modal.Header>
          <Message negative size="mini">
            <Message.Header>
              Wrong username or password, try again.
            </Message.Header>
          </Message>
        </Modal.Header> :
        null
      }
      <Modal.Content>
        <Form onSubmit={handleLogin}>
          <Form.Input
            type="text"
            label="username"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <Form.Input
            type="password"
            label="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Form.Button
            type="submit"
          >
            Log in
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default LoginForm