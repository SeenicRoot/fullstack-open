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

const getOneFromId = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const incrementLikes = async id => {
  const getResponse = await axios.get(`${baseUrl}/${id}`)
  const updatedBlog = {
    likes: getResponse.data.likes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const exports = { setToken, getAll, getOneFromId, create, update, remove, incrementLikes }
export default exports