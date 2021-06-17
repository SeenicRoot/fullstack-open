import React from 'react'
import { useSelector } from 'react-redux'
import {
  Table,
  Header
} from 'semantic-ui-react'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Header as="h2">Users</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Blogs Posted</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell><a href={`/users/${user.id}`}>{user.username}</a></Table.Cell>
              <Table.Cell>{user.posts.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Users