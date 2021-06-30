import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, BOOK_ADDED } from '../queries'

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
  const client = useApolloClient()

  const result = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const allAuthorsInStore = client.readQuery({ query: ALL_AUTHORS })
      if (!allAuthorsInStore.allAuthors.map(a => a.id).includes(addedBook.author.id)) {
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: allAuthorsInStore.allAuthors.concat(addedBook.author)
          }
        })
      }
    }
  })
  
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
