import React from 'react'

const Blog = ({blog}) => (
  <div>
    <a href={blog.url}>{blog.title} - {blog.author}</a>
  </div>  
)

export default Blog