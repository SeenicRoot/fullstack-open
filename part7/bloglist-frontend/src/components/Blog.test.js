import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing blog component',
    author: 'Adam',
    url: 'http://www.example.com',
    likes: '0',
    user: {
      username: 'sean',
    }
  }
  const addLike = jest.fn()
  const deleteBlog = jest.fn()
  const user = {
    username: 'sean',
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user}/>
    )
  })

  test('blog displays only author and title at first', () => {
    const blogDiv = component.container.querySelector('.blog')

    expect(blogDiv).toHaveTextContent(blog.title)
    expect(blogDiv).toHaveTextContent(blog.author)
    expect(blogDiv).not.toHaveTextContent(blog.url)
    expect(blogDiv).not.toHaveTextContent(blog.likes)
  })

  test('blog displays likes and url when view button is pressed', () => {
    const blogDiv = component.container.querySelector('.blog')

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(blogDiv).toHaveTextContent(blog.url)
    expect(blogDiv).toHaveTextContent(blog.title)
  })

  test('blog likes button calls event handler correctly', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    const clicks = 2
    for (let i = 0; i < clicks; i++) {
      fireEvent.click(likeButton)
    }

    expect(addLike.mock.calls.length).toBe(clicks)
  })
})