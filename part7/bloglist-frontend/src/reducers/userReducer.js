const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'RESET_USER':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  }
}

export const resetUser = () => {
  return {
    type: 'RESET_USER',
  }
}

export default reducer