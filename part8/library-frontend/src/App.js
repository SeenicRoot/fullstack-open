import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import { useApolloClient, useSubscription } from '@apollo/client'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const allBooksInStore = client.readQuery({ query: ALL_BOOKS })
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooksInStore.allBooks.concat(subscriptionData.data.bookAdded) }
      })
    }
  })


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