import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogsService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationError, setNotificationError] = useState(false)

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

  const addLike = async blog => {
    try {
      const updatedBlog = await blogsService.incrementLikes(blog.id)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    }
    catch (exception) {
      setNotificationError(true)
      setNotificationMessage('error liking message')
      setTimeout(() => {
        setNotificationError(false)
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const userLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotificationError(true)
      setNotificationMessage('wrong username or password')
      setPassword('')
      setTimeout(() => {
        setNotificationError(false)
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogsService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }  
  
  const newBlogRef = useRef()
  
  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={newBlogRef}>
      <NewBlogForm 
        createBlog={createBlog}
      />
    </Toggleable>
  )
  
  const createBlog = async blogObject => {
    try {
      await blogsService.create(blogObject)
      const blogs = await blogsService.getAll()
      newBlogRef.current.toggleVisibility()
      setBlogs(blogs)
      setNotificationMessage('blog added succesfully')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
    catch (exception) {
      setNotificationError(true)
      setNotificationMessage('error creating message')
      setPassword('')
      setTimeout(() => {
        setNotificationError(false)
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async blogObject => {
    try {
      await blogsService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setNotificationMessage('blog deleted')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
    catch (exception) {
      setNotificationError(true)
      setNotificationMessage("you don't have permission to do that")
      setTimeout(() => {
        setNotificationError(false)
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  
  return (
    <div>
      <Notification notificationMessage={notificationMessage} notificationError={notificationError} />
      {user === null ?
        <LoginForm
          username={username}
          handleUsernameChange={({target}) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({target}) => setPassword(target.value)}
          userLogin={userLogin}
        /> :
        <>
          <p>logged in as {user.username} <button onClick={userLogout}>logout</button></p>
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