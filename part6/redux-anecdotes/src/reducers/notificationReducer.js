const initialValue = 'Hullo! I am a new notification'

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const changeNotification = message => {
  return {
    type: 'CHANGE_NOTIFICATION',
    data: message
  }
}

export default reducer