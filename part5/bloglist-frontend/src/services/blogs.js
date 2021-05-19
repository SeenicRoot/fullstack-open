import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newPost => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}

const exports = { setToken, getAll, create }
export default exports