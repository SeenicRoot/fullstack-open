const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId = null
export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    clearTimeout(timeoutId) // does nothing if timeoutId is not valid
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeout)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer