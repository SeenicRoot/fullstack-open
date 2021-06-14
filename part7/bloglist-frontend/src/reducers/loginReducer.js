const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'RESET_USER':
      return null
    default:
      return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    data: user,
  }
}

export const resetUser = () => {
  return {
    type: 'RESET_USER',
  }
}

export default reducer