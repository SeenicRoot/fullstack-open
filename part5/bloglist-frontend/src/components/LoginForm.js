import React from 'react'

const LoginForm = props => (
  <form onSubmit={props.userLogin}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={props.handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={props.handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm