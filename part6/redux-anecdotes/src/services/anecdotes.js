import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async anecdote => {
  const object = {
    content: anecdote,
    votes: 0,
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}


const service = {
  getAll,
  createAnecdote,
}

export default service