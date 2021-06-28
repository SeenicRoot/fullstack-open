import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthyearChange = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set year of birth</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <select name="name" value={name} onChange={(event) => setName(event.target.value)} >
              {authors.map((a, i) => (
                <option key={i} value={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Born
            <input name="born" value={born} onChange={(event) => setBorn(event.target.value)} />
          </label>
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  
  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.loggedIn && <BirthyearChange authors={result.data.allAuthors} />}
    </div>
  )
}

export default Authors
