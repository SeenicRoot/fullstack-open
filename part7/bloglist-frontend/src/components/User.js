import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}

export default User