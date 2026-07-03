const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Important blog',
    author: 'Walter Writer',
    url: 'www.blog.important.fi',
    likes: 2
  },
  {
    title: 'Not Important blog',
    author: 'Not Walter Writer',
    url: 'Not www.blog.important.fi',
    likes: 3
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const initialUsers = [
  {
    username: 'firstuser',
    name: 'firstname',
    password: 'firstsecret'
  }
]


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('returned blogs include an id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
})

test('posting a blog increases blog amount by one', async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

  const username = userObject.username
  const password = initialUsers[0].password

  const login = await api.post('/api/login').send({ username, password })
  const token = login.body.token

  const initialBlogs = await api.get('/api/blogs')
  const initialAmount = initialBlogs.body.length

  const blog = {
    title: 'new blog',
    author: 'just someone',
    url: 'blog.com',
    likes: 10
  }

  const postedBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
  const allBlogs = await api.get('/api/blogs')

  assert(allBlogs.body.length === initialAmount + 1)
})

test('missing likes property defaults to 0', async () => {
  const blog = {
    title: 'new blog',
    author: 'just someone',
    url: 'blog.com'
  }

  const postedBlog = await api.post('/api/blogs').send(blog)

  assert(postedBlog.body.likes === 0)
})

test('missing title property receives status error 400', async () => {
  const blog = {
    author: 'just someone',
    url: 'blog.com',
    likes: 10
  }

  const postedBlog = await api.post('/api/blogs').send(blog)

  assert(postedBlog.status === 400)
})

test('missing url property receives status error 400', async () => {
  const blog = {
    title: 'new blog',
    author: 'just someone',
    likes: 10
  }

  const postedBlog = await api.post('/api/blogs').send(blog)

  assert(postedBlog.status === 400)
})

test('deleting an existing blog removes it from db', async () => {

  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()

  const username = userObject.username
  const password = initialUsers[0].password

  const login = await api.post('/api/login').send({ username, password })
  const token = login.body.token

  const allBlogs = await api.get('/api/blogs')
  const idToRemove = allBlogs.body[0].id

  await api.delete(`/api/blogs/${idToRemove}`)

  const currentBlogs = await api.get('/api/blogs')

  ids = currentBlogs.body.map(b => b.id)
  assert(!ids.includes(idToRemove))
})

test('deleting non-existing id returns 204', async () => {
  const allBlogs = await api.get('/api/blogs')
  const deleteId = '4a0abe3bf8e71208f1764f76'

  const response = await api.delete(`/api/blogs/${deleteId}`)

  assert(response.status == 204)
})

test('updating all blog contents works', async () => {
  const allBlogs = await api.get('/api/blogs')
  const idToUpdate = allBlogs.body[0].id
  const blogToUpdate = await Blog.findById(idToUpdate)

  const newAuthor = 'new author'
  const newUrl = 'new url'
  const newLikes = 1
  
  const newContents = {
    title: blogToUpdate.title,
    author: newAuthor,
    url: newUrl,
    likes: newLikes
  }

  const response = await api.put(`/api/blogs/${idToUpdate}`).send(newContents)

  assert(response.body.author == newAuthor)
  assert(response.body.url == newUrl)
  assert(response.body.likes == newLikes)
})

test('updating only likes works', async () => {
  const allBlogs = await api.get('/api/blogs')
  const idToUpdate = allBlogs.body[0].id
  const blogToUpdate = await Blog.findById(idToUpdate)

  const newLikes = 100
  
  const newContents = {
    likes: newLikes
  }

  const response = await api.put(`/api/blogs/${idToUpdate}`).send(newContents)
  assert(response.body.title === blogToUpdate.title)
  assert(response.body.author === blogToUpdate.author)
  assert(response.body.url === blogToUpdate.url)
  assert(response.body.likes == newLikes)
})

test('updating non-existing blog returns 404', async () => {
  const allBlogs = await api.get('/api/blogs')
  const idToUpdate = '4a0abe3bf8e71208f1764f76'

  const newContents = {
    title: 'Important blog',
    author: 'author',
    url: 'url',
    likes: 'newlikes'
  }
  const response = await api.put(`/api/blogs/${idToUpdate}`).send(newContents).expect(404)

  assert(response.status === 404)
})

after(async () => {
  await mongoose.connection.close()
})
