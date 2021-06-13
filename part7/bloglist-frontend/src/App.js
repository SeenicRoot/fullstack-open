import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogsService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const dispatch = useDispatch()

  const addLike = async blog => {
    try {
      await blogsService.incrementLikes(blog.id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    }
    catch (exception) {
      dispatch(setNotification('error liking message', true, 3000))
    }
  }

  const userLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setNotification('wrong username or password', true, 3000))
      setPassword('')
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogsService.setToken(null)
    setUser(null)
  }

  const newBlogRef = useRef()

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={newBlogRef}>
      <NewBlogForm
        addBlog={addBlog}
      />
    </Toggleable>
  )

  const addBlog = async blogObject => {
    try {
      const createdBlog = await blogsService.create(blogObject)
      createdBlog.user = {
        username: 'sean'
      }
      setBlogs(blogs.concat(createdBlog))
      newBlogRef.current.toggleVisibility()
      dispatch(setNotification('blog added successfully', false, 3000))
    }
    catch (exception) {
      dispatch(setNotification('error creating message', true, 3000))
      setPassword('')
    }
  }

  const deleteBlog = async blogObject => {
    try {
      await blogsService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      dispatch(setNotification('blog deleted', false, 3000))
    }
    catch (exception) {
      dispatch(setNotification('you don\'t have permission to do that', true, 3000))
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          userLogin={userLogin}
        /> :
        <>
          <p>logged in as {user.username} <button id="logout-button" onClick={userLogout}>log out</button></p>
          {newBlogForm()}
        </>
      }
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App