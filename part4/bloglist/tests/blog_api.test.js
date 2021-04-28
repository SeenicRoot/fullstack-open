const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are blogs in the database', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have the property "id"', async () => {
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs[0].id).toBeDefined()
  })
})

describe('addition of a blog', () => {
  test('a blog post can be added', async () => {
    const newBlog = {
      title: 'Starting this newsletter, print debugging, BYOC',
      author: 'Geoffrey Litt',
      url: 'https://buttondown.email/geoffreylitt/archive/starting-this-newsletter-print-debugging-byoc/',
      likes: 0,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toContainEqual(response.body)
  })

  test('if blog likes property is missing, likes is set to 0', async() => {
    const newBlog = {
      title: 'Starting this newsletter, print debugging, BYOC',
      author: 'Geoffrey Litt',
      url: 'https://buttondown.email/geoffreylitt/archive/starting-this-newsletter-print-debugging-byoc/',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
    
    expect(response.body).toHaveProperty('likes', 0)
  })

  test('blog is required to have a url and title', async () => {
    const noUrlBlog = {
      title: 'Starting this newletter, print debugging, BYOC',
      author: 'Geoffrey Litt',
      likes: 0,
    }
    const noTitleBlog = {
      author: 'Geoffrey Litt',
      url: 'https://buttondown.email/geoffreylitt/archive/starting-this-newsletter-print-debugging-byoc/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send('noUrlBlog')
      .expect(400)
    await api
      .post('/api/blogs')
      .send('noTitleBlog')
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('update of a blog', () => {
  test('succeeds with status 200 if id is valid', async() => {
    const blogs = await helper.blogsInDb()
    const originalBlog= blogs[0]
    const newBlog = {
      likes: 100000,
    }
    await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(newBlog)
      .expect(200)

    const badId = 12345
    await api
      .put(`/api/blogs/${badId}`)
      .send(newBlog)
      .expect(400)
  })

  test('only updates the likes property of a blog', async () => {
    const blogs = await helper.blogsInDb()
    const originalBlog = blogs[0]
    const newBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
      likes: 1000000,
    }
    
    const updatedBlog = await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(newBlog)

    expect(updatedBlog.body).toHaveProperty('likes', newBlog.likes)
    expect(updatedBlog.body).toHaveProperty('author', originalBlog.author)
    expect(updatedBlog.body).toHaveProperty('title', originalBlog.title)
    expect(updatedBlog.body).toHaveProperty('url', originalBlog.url)
  })
})

afterAll(() => {
  mongoose.connection.close()
})