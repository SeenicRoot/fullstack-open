const initialState = {
  message: null,
  errorFlag: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        errorFlag: true,
      }
    default:
      return state
  }
}

let timeoutId = null
export const setNotification = (message, errorFlag, timeout) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        errorFlag
      },
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeout)
  }
}

export default reducer