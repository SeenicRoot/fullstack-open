import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const handleSubmit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.setNotification(`added "${content}"`, 5000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <input name="anecdote" />
      <button type="submit">add anecdote</button>
    </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const connected = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connected