import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async event => {
    event.preventDefault()
    await addBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
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
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm