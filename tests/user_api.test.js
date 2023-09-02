const mongoose = require('mongoose')
const supertest = require('supertest')
const users = require('./data/users')
const app = require('../app')
const User = require('../models/User')

mongoose.set('bufferTimeoutMS', 50000)

const api = supertest(app)

describe('post /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('successfully creates a user without blogs', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Kohdy',
      password: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
  })

  test('returns 400 Bad Request if missing username', async () => {
    const user = {
      name: 'Kohdy',
      password: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if missing name', async () => {
    const user = {
      username: 'kmrnicholson',
      password: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if missing password', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Kohdy'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if invalid username', async () => {
    const user = {
      username: 'km',
      name: 'Kohdy',
      password: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if invalid name', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Ko',
      password: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if username is not unique', async () => {
    const user = new User(users[0])
    await user.save()

    const newUser = {
      username: user.username,
      name: 'Kohdy',
      password: '18237981hudh'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
