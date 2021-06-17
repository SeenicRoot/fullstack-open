import React, { useEffect, useRef } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import {
  Header,
  Container,
  Divider
} from 'semantic-ui-react'

import blogsService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const login = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogsService.setToken(user.token)
    }
  }, [])

  const newBlogRef = useRef()

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={newBlogRef}>
      <NewBlogForm toggleVisibility={() => newBlogRef.current.toggleVisibility()}/>
    </Toggleable>
  )

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <Container>
      <Navbar />
      <Notification />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <h2>users</h2>
          <Users />
        </Route>
        <Route path='/'>
          <Header as='h2'>Blogs</Header>
          <Divider />
          {login !== null && newBlogForm()}
          <Blogs blogs={sortedBlogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App