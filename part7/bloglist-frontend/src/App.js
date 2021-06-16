import React, { useEffect, useRef } from 'react'
import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'

import blogsService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const login = useSelector(state => state.login)

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

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <nav>
        <Link className="link" to="/">blogs</Link>
        <Link className="link" to="/users">users</Link>
        {login === null ?
          <LoginForm className="nav-right" /> :
          <p className="nav-right">Welcome, {login.username}! <button id="logout-button" onClick={userLogout}>log out</button></p>
        }
      </nav>
      <Notification />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
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
          <Blogs blogs={sortedBlogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default App