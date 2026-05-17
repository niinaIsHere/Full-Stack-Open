const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

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


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('returned blogs include an id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
})

test('posting a blog increases blog amount by one', async () => {
  const amount = initialBlogs.length

  const blog = {
    title: 'new blog',
    author: 'just someone',
    url: 'blog.com',
    likes: 10
  }

  const postedBlog = await api.post('/api/blogs').send(blog)
  const allBlogs = await api.get('/api/blogs')

  assert(allBlogs.body.length === amount + 1)
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

  assert(postedBlog.status == 400)
})

test('missing url property receives status error 400', async () => {
  const blog = {
    title: 'new blog',
    author: 'just someone',
    likes: 10
  }

  const postedBlog = await api.post('/api/blogs').send(blog)

  assert(postedBlog.status == 400)
})


after(async () => {
  await mongoose.connection.close()
})
