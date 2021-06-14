import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: createdBlog,
    })
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs,
  }
}

export default reducer