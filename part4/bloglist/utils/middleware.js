const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).end()
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).end()
  }
}

module.exports = {
  errorHandler
}