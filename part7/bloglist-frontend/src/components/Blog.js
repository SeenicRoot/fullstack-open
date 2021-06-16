import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const login = useSelector(state => state.login)

  const dispatch = useDispatch()

  const handleAddLike = () => {
    dispatch(addLike(blog.id))
  }

  const handleDeleteBlog = () => {
    const confirmed = window.confirm(`delete "${blog.title}"?`)
    if (confirmed) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('blog deleted', false, 3000))
      }
      catch (exception) {
        dispatch(setNotification('you don\'t have permission to do that', true, 3000))
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a><br /></p>
      <p>{blog.likes} likes <button onClick={handleAddLike}>like</button></p>
      <p>{blog.author}</p>
      <div>{login && login.username === blog.user.username && <button onClick={handleDeleteBlog}>delete</button>}</div>
    </div>
  )
}

export default Blog