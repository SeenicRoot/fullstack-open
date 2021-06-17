import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import blogService from '../services/blogs'

const Navbar = () => {
  const location = useLocation().pathname
  const [activeTab, setActiveTab] = useState('')
  const login = useSelector(state => state.login)

  useEffect(() => {
    let path = location.split('/')[1]
    setActiveTab(path)
  }, [location])

  const dispatch = useDispatch()

  const userLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(loginUser(null))
  }

  return (
    <Menu pointing>
      <Menu.Item
        active={activeTab === '' || activeTab === 'blogs'}
        name="blogs"
        as={Link}
        to="/"
      >
        Blogs
      </Menu.Item>
      <Menu.Item
        active={activeTab === 'users'}
        name="users"
        as={Link}
        to="/users"
      >
        Users
      </Menu.Item>
      <Menu.Menu position="right">
        {login === null ?
          <Menu.Item>
            <LoginForm />
          </Menu.Item> :
          <>
            <Menu.Item >
              Welcome, {login.username}!
              <Button style={{ marginLeft: 10 }} onClick={userLogout}>Log out</Button>
            </Menu.Item>
          </>
        }
      </Menu.Menu>
    </Menu>
  )}

export default Navbar