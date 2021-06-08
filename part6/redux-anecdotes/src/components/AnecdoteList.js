import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <li>
    <div>{anecdote.content}</div>
    <div>has {anecdote.votes} <button onClick={handleVote}>vote</button></div>
  </li>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const addVote = anecdote => {
    dispatch(addVoteTo(anecdote.id))
    dispatch(setNotification(`voted for "${anecdote.content}"`, 5000))
  }

  const sortedAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
  return (
    <ul>
      {sortedAnecdotes.map(anecdote => 
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => addVote(anecdote)} />
      )}
    </ul>
  )
}

export default AnecdoteList