import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ME } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const meResult = useQuery(ME)

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      if (error.networkError) {
        window.alert(`Error: ${error.networkError.message}`)
      }
      else if (error.graphQLErrors) {
        window.alert(`Error: ${error.graphQLErrors[0].message}`)
      }
    },
    update: (store, response) => {
      const allBooksData = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...allBooksData,
          allBooks: [...allBooksData.allBooks, response.data.addBook]
        }
      })

      if (meResult && response.data.addBook.genres.includes(meResult.data.me.favouriteGenre)) {
        const filteredBooksData = store.readQuery({ query: ALL_BOOKS, variables: { genre: meResult.data.me.favouriteGenre } })
        store.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: meResult.data.me.favouriteGenre },
          data: {
            ...filteredBooksData,
            allBooks: [...filteredBooksData.allBooks, response.data.addBook]
          }
        })
      }
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          Genres: {genres.join(' ')}
        </div>
        <button type='submit'>Create book</button>
      </form>
    </div>
  )
}

export default NewBook