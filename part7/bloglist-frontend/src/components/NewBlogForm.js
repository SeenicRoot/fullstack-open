import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Form,
  Header
} from 'semantic-ui-react'

const NewBlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const login = useSelector(state => state.login)

  const dispatch = useDispatch()

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
      user: {
        username: login.username,
      },
    }

    try {
      dispatch(addBlog(blog))
      toggleVisibility()
      dispatch(setNotification('blog added successfully', false, 3000))
    }
    catch (exception) {
      dispatch(setNotification('error creating blog post', true, 3000))
    }
  }

  return (
    <Form onSubmit={createBlog}>
      <Header as="h3">Add new blog</Header>
      <Form.Input
        id="title"
        type="text"
        value={title}
        name="Title"
        label="title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <Form.Input
        id="author"
        type="text"
        value={author}
        name="Author"
        label="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <Form.Input
        id="url"
        type="text"
        value={url}
        name="URL"
        label="url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <Form.Button id="new-blog-button" type="submit">create</Form.Button>
    </Form>
  )
}

export default NewBlogForm