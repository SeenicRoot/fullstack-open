const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('posts', { title: 1, author: 1, url: 1, likes: 1, id: 1})
  response.status(200).json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('posts', { title: 1, author: 1, url: 1, likes: 1, id: 1})
  response.status(200).json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password) {
    return response.status(400).json({ error: "password is required" })
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: "length of password should be 3 or greater"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username.toLowerCase(),
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter