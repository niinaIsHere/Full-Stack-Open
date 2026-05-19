const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'firstuser',
    name: 'firstname',
    password: 'firstsecret'
  },
  {
    username: 'seconduser',
    name: 'secondname',
    password: 'secondsecret'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('creating user without username returns 400', async () => {
    const user = {
        name: 'moi',
        password: 'pass'
    }

    const postedUser = await api.post('/api/users').send(user)

    assert(postedUser.status == 400)
    assert(postedUser.body.error == 'User validation failed: username: Path `username` is required.')
})

test('creating user without password returns 400', async () => {
    const user = {
        username: 'username',
        name: 'moi'
    }
    const postedUser = await api.post('/api/users').send(user)

    assert(postedUser.status == 400)
    assert(postedUser.body == 'Password is required')
})

test('creating user with too short username returns 400', async () => {
    const user = {
        username: 'a',
        name: 'moi',
        password: 'pass'
    }

    const postedUser = await api.post('/api/users').send(user)

    assert(postedUser.status == 400)
    assert(postedUser.body.error == 'User validation failed: username: Path `username` (`a`, length 1) is shorter than the minimum allowed length (3).')
})

test('creating user with too short password returns 400', async () => {
    const user = {
        username: 'username',
        name: 'moi',
        password: 'a'
    }

    const postedUser = await api.post('/api/users').send(user)

    assert(postedUser.status == 400)
    assert(postedUser.body == 'Password must be at least 3 characters long')
})

after(async () => {
  await mongoose.connection.close()
})
