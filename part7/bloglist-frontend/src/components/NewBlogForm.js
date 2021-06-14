import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const createBlog = async event => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
      user: {
        username: user.username,
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
    <form onSubmit={createBlog}>
      <h2>create new blog</h2>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="new-blog-button" type="submit">create</button>
    </form>
  )
}

export default NewBlogForm