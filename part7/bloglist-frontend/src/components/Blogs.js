import React from 'react'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    border: '1px solid black',
    padding: '5px 6px',
    margin: '3px 0',
  }

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          <a href={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</a>
        </div>
      ))}
    </div>
  )
}

export default Blogs