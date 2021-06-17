import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const [commentField, setCommentField] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addComment(blogId, commentField))
    setCommentField('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={commentField}
        name="comment"
        onChange={event => setCommentField(event.target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

const Comments = ({ blog }) => {
  return (
    <div>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments