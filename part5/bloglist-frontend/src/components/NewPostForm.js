import React from 'react'

const NewPostForm = ({createPost, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => (
  <form onSubmit={createPost}>
    <h2>create new post</h2>
    <div>
      title:
      <input
        type="text"
        value={title}
        name="Title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author: 
      <input
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url: 
      <input
        type="text"
        value={url}
        name="URL"
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default NewPostForm