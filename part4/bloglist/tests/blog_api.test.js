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

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have the property "id"', async () => {
  const allBlogs = await helper.blogsInDb()
  expect(allBlogs[0].id).toBeDefined()
})

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

test('if blog likes property is missing, set likes to 0', async() => {
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

test('blog has to have a url and title', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})