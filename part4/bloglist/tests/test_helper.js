const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    _id: "60906191c7b2190f754fb6f9",
    username: "TestUser1",
    passwordHash: "$2b$10$JCcxVnYxJ2RL48D.Q.sr4uKZdB6uQglqoxDG7wMRzQViXDU8xJbqu",
    posts: [],
    __v: 0
  },
  {
    _id: "60906197c7b2190f754fb6fa",
    username: "TestUser2",
    passwordHash: "$2b$10$Zj9rR7DzW6nvKSQJqOWUFeu7zsoW6T7Pc7FZh53QuPm8rQMQD.Jjy",
    posts: [],
    __v: 0
  },
  {
    _id: "6090619dc7b2190f754fb6fb",
    username: "TestUser3",
    passwordHash: "$2b$10$jChkMigezjwlVvn5.swiVO0oVBXs70KoqO7agbHAbSVdnJATIpSau",
    posts: [],
    __v: 0
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}
