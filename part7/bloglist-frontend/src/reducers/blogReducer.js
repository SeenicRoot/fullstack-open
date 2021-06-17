import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
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

export const addLike = (id) => {
  return async (dispatch) => {
    const blog = await blogService.incrementLikes(id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.addComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export default reducer