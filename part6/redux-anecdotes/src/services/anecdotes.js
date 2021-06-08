import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async anecdote => {
  const object = {
    content: anecdote,
    votes: 0,
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async id => {
  let response = await axios.get(`${baseUrl}/${id}`)
  const blog = {...response.data, votes: response.data.votes + 1}
  response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}


const service = {
  getAll,
  createNew,
  addVote,
}

export default service