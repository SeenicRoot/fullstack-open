import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = ({ autoNotification }) => {
  const dispatch = useDispatch()
  
  const handleSubmit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = await anecdotesService.createAnecdote(content)
    dispatch(createAnecdote(anecdote))
    autoNotification(`added "${content}"`, 5000)
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

export default AnecdoteForm