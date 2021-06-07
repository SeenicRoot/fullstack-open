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

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer