import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'ADD_VOTE':
      const id = action.data.id
      const chosenAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...chosenAnecdote, votes: chosenAnecdote.votes + 1 }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVoteTo = id => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer