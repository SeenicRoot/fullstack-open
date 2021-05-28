import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ userLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={userLogin}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm