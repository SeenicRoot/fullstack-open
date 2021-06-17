import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import {
  Form,
  List
} from 'semantic-ui-react'

const CommentForm = ({ blogId }) => {
  const [commentField, setCommentField] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addComment(blogId, commentField))
    setCommentField('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        value={commentField}
        name="comment"
        onChange={event => setCommentField(event.target.value)}
      />
      <Form.Button type="submit">add comment</Form.Button>
    </Form>
  )
}

const Comments = ({ blog }) => {
  return (
    <div>
      <CommentForm blogId={blog.id} />
      <List bulleted>
        {blog.comments.map((comment, index) => (
          <List.Item key={index}>
            {comment}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Comments