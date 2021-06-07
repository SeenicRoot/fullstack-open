import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from './reducers/notificationReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  let timeoutId = null
  const autoNotification = (message, timeout) => {
    dispatch(setNotification(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList autoNotification={autoNotification}/>
      <AnecdoteForm autoNotification={autoNotification}/>
    </div>
  )
}

export default App