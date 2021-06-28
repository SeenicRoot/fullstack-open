import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const GenreFilter = ({ genres, setGenre }) => {
  const style = {
    border: "1px solid black",
    borderRadius: "7px",
    padding: "3px",
    margin: "0 3px"
  }

  return (
    <div>
      {genres.map(g => (
        <label key={g} style={style}>
          {g}
          <input name="filter" type="radio" onChange={() => setGenre(g)} />
        </label>
      ))}
      <label style={style}>
        all
        <input name="filter" type="radio" onChange={() => setGenre(null)} />
      </label>
    </div>
  )
} 

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      setGenres([...new Set(result.data.allBooks.reduce((genres, b) => {
        return genres.concat(b.genres)
      }, []))])
    }
  }, [result.data])

  if (!props.show || result.loading) {
    return null
  }

  const booksToShow = genre ? result.data.allBooks.filter(b => b.genres.includes(genre)) : result.data.allBooks

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {booksToShow.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreFilter genres={genres} setGenre={setGenre} />
    </div>
  )
}

export default Books