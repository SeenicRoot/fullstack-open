import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import {
  Header,
  Button,
  Divider
} from 'semantic-ui-react'

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
      <Header as="h2">{blog.title}</Header>
      <p><a href={blog.url}>{blog.url}</a><br /></p>
      <Divider />
      <p>{blog.likes} likes <Button onClick={handleAddLike}>like</Button></p>
      <p>Written by: {blog.author}</p>
      <div>{login && login.username === blog.user.username && <Button onClick={handleDeleteBlog}>delete</Button>}</div>
      <Divider />
      <Comments blog={blog} />
    </div>
  )
}

export default Blog