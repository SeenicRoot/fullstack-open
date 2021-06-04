import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

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
      <AnecdoteList autoNotification={autoNotification}/>
      <AnecdoteForm autoNotification={autoNotification}/>
    </div>
  )
}

export default App