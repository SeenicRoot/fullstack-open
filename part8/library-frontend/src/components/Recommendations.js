import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const { loading: meLoading, data: meData } = useQuery(ME)
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS)
  
  if (meLoading || booksLoading || !show) {
    return null
  }
  
  const booksToShow = booksData.allBooks.filter(b => b.genres.includes(meData.me.favouriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre: {meData.me.favouriteGenre}</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map(b => (
            <tr>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations