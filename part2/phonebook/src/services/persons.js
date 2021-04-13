import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const create = (person) => {
  return axios.post(`${baseUrl}`, person)
    .then(response => response.data)
}

const deletePersonId = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject)
    .then(response => response.data)
}

export default {getAll, create, deletePersonId, update}