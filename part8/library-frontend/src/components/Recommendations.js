import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const { loading: meLoading, data: meData } = useQuery(ME)
  const [allBooks, { loading: booksLoading, data: booksData }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (meData) {
      allBooks({ variables: { genre: meData.me.favouriteGenre } })
    }
  }, [meData, allBooks])
  
  if (meLoading || booksLoading || !show) {
    return null
  }
  
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
          {booksData.allBooks.map((b, i) => (
            <tr key={i}>
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