import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleAddLike = () => {
    addLike(blog)
  }

  const handleDeleteBlog = () => {
    const confirmed = window.confirm(`delete "${blog.title}"?`)
    if (confirmed) {
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    border: '1px solid black',
    padding: '5px 6px',
    margin: '3px 0',
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
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