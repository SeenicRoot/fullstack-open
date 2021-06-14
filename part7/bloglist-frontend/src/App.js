import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogsService from './services/blogs'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogsService.setToken(user.token)
    }
  }, [])

  const addLike = async blog => {
    try {
      await blogsService.incrementLikes(blog.id)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      dispatch(setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)))
    }
    catch (exception) {
      dispatch(setNotification('error liking message', true, 3000))
    }
  }

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogsService.setToken(null)
    dispatch(setUser(null))
  }

  const newBlogRef = useRef()

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={newBlogRef}>
      <NewBlogForm toggleVisibility={() => newBlogRef.current.toggleVisibility()}/>
    </Toggleable>
  )

  const deleteBlog = async blogObject => {
    try {
      await blogsService.remove(blogObject.id)
      dispatch(setBlogs(blogs.filter(blog => blog.id !== blogObject.id)))
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
        <LoginForm /> :
        <>
          <p>logged in as {user.username} <button id="logout-button" onClick={userLogout}>log out</button></p>
          {newBlogForm()}
        </>
      }
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App