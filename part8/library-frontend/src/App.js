import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('books')}>Books</button>
          <button onClick={() => setPage('authors')}>Authors</button>
          <button onClick={() => setPage('login')}>Login</button>
        </div>

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />

        <Authors
          show={page === 'authors'}
          loggedIn={false}
        />

        <Books
          show={page === 'books'}
        />

      </div>
    )
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('add')}>Add book</button>
        <button onClick={() => setPage('recommendations')}>Recommendations</button>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <Books
        show={page === 'books'}
      />

      <Authors
        show={page === 'authors'}
        loggedIn={true}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

    </div>
  )
}

export default App