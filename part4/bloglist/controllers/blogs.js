const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1 })
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.posts = user.posts.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate({path: 'user', select: 'username'}).execPopulate()
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: "cannot delete another user's post" })
  }
  await blogToDelete.remove()

  request.user.posts = request.user.posts.filter(post => post.toString() !== request.params.id)
  request.user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  const populatedBlog = await updatedBlog.populate({path: 'user', select: 'username'}).execPopulate()
  response.json(populatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.content

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()
  const populatedBlog = await updatedBlog.populate({path: 'user', select: 'username'}).execPopulate()
  response.json(populatedBlog)
})

module.exports = blogsRouter