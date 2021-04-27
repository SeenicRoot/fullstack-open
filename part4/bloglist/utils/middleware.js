const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.send(400)
  } 
  if (error.name === 'ValidationError') {
    return response.send(400)
  }
}

module.exports = {
  errorHandler
}