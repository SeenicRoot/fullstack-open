import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import blogService from './services/blogs'
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
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
      }, 5000)
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }  
  
  const newPostRef = useRef()
  
  const newPostForm = () => (
    <Toggleable buttonLabel="new post" ref={newPostRef}>
      <NewPostForm 
        createPost={createPost}
      />
    </Toggleable>
  )
  
  const createPost = async postObject => {
    try {
      const response = await blogService.create(postObject)
      newPostRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      setNotificationMessage('blog post added succesfully')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    catch (exception) {
      setNotificationError(true)
      setNotificationMessage('error creating message')
      setPassword('')
      setTimeout(() => {
        setNotificationError(false)
        setNotificationMessage(null)
      }, 5000)
    }
  }
  
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
          {newPostForm()}
        </>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App