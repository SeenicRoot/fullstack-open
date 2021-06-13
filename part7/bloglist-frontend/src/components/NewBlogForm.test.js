import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('submit button calls event handler with right details', async () => {
    const addBlog = jest.fn()

    const component = render(
      <NewBlogForm addBlog={addBlog} />
    )

    const blog = {
      title: 'Testing new blog form',
      author: 'Adam',
      url: 'http://www.example.com'
    }

    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: blog.title }
    })
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(url, {
      target: { value: blog.url }
    })

    fireEvent.submit(form)

    await waitFor(() => {
      expect(addBlog.mock.calls).toHaveLength(1)
      expect(addBlog.mock.calls[0][0]).toEqual(blog)
    })
  })
})