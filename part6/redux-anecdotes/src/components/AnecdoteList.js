import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <li>
    <div>{anecdote.content}</div>
    <div>has {anecdote.votes} <button onClick={handleVote}>vote</button></div>
  </li>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <ul>
      {sortedAnecdotes.map(anecdote => 
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(addVoteTo(anecdote.id))} />
      )}
    </ul>
  )
}

export default AnecdoteList