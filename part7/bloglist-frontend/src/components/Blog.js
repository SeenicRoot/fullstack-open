import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

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

  const blogStyle = {
    border: '1px solid black',
    padding: '5px 6px',
    margin: '3px 0',
  }

  if (showDetails) {
    return (
      <div style={blogStyle} className="blog">
        <h4 style={{ display: 'inline' }}>{blog.title}</h4> <button onClick={handleShowDetails}>hide</button><br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes <button onClick={handleAddLike}>like</button><br />
        {blog.author}<br />
        {user && user.username === blog.user.username && <button onClick={handleDeleteBlog}>delete</button>}
      </div>
    )
  }
  return (
    <div style={blogStyle} className="blog">
      {blog.title} - {blog.author} <button onClick={handleShowDetails}>view</button>
    </div>
  )
}

export default Blog