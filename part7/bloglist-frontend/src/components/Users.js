import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><a href={`/users/${user.id}`}>{user.username}</a></td>
              <td>{user.posts.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users