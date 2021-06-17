import React from 'react'
import {
  Header,
  List,
  Divider,
  Dimmer,
  Loader,
} from 'semantic-ui-react'

const User = ({ user }) => {
  if (!user) {
    return (
      <Dimmer inverted active>
        <Loader inverted />
      </Dimmer>
    )
  }

  return (
    <div>
      <Header as="h2">{user.username}</Header>
      <Divider />
      <Header as="h3">Added Blogs</Header>
      <List>
        {user.posts.map(post => <List.Item key={post.id} as="a" href={`/blogs/${post.id}`}>{post.title}</List.Item>)}
      </List>
    </div>
  )
}

export default User