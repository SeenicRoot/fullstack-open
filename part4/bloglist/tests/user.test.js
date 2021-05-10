const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promises = userObjects.map(user => user.save())
  await Promise.all(promises)
})

describe('creating a new user', () => {
  test('adding a user works', async () => {
    const user = {
      username: 'NewUser',
      password: 'IAmNew'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toContainEqual(response.body)
  })

  test('user with no password or username is not created', async() => {
    const user = {
      username: 'NewUser',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).not.toEqual(expect.arrayContaining([expect.objectContaining({username: 'NewUser'})]))
  })

  test('user with password or username of less than 3 characters to not be created', async() => {
    const shortPassword = {
      username: 'ShortPassword',
      password: 'a'
    }
    const shortUserName = {
      username: 's',
      password: 'ShortUsername'
    }
    await api.post('/api/users').send(shortPassword).expect(400)
    await api.post('/api/users').send(shortUserName).expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).not.toEqual(expect.arrayContaining([expect.objectContaining({username: 'ShortPassword'})]))
    expect(usersAtEnd).not.toEqual(expect.arrayContaining([expect.objectContaining({username: 's'})]))
  })
})

afterAll(() => {
  mongoose.connection.close()
})