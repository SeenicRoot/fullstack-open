import React from 'react'
import {
  Item
} from 'semantic-ui-react'

const Blogs = ({ blogs }) => {
  // const blogStyle = {
  //   border: '1px solid black',
  //   padding: '5px 6px',
  //   margin: '3px 0',
  // }

  return (
    <Item.Group divided>
      {blogs.map(blog => (
        <Item key={blog.id}>
          <a href={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</a>
        </Item>
      ))}
    </Item.Group>
  )
}

export default Blogs