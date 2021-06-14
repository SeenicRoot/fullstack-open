import React, { useEffect, useRef } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'

import blogsService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const login = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogsService.setToken(user.token)
    }
  }, [])

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogsService.setToken(null)
    dispatch(loginUser(null))
  }

  const newBlogRef = useRef()

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={newBlogRef}>
      <NewBlogForm toggleVisibility={() => newBlogRef.current.toggleVisibility()}/>
    </Toggleable>
  )

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Notification />
      {login === null ?
        <LoginForm /> :
        <p>logged in as {login.username} <button id="logout-button" onClick={userLogout}>log out</button></p>
      }
      <Switch>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <h2>users</h2>
          <Users />
        </Route>
        <Route path='/'>
          {login !== null && newBlogForm()}
          <h2>blogs</h2>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App