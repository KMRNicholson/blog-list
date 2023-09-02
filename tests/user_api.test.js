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
      passwordHash: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
  })

  test('returns 400 Bad Request if missing username', async () => {
    const user = {
      name: 'Kohdy',
      passwordHash: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if missing name', async () => {
    const user = {
      username: 'kmrnicholson',
      passwordHash: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if missing passwordHash', async () => {
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
      passwordHash: '81237dhiuhs8'
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
      passwordHash: '81237dhiuhs8'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 Bad Request if invalid passwordHash', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Kohdy',
      passwordHash: 'notlong'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('returns 400 if username is not unique', async () => {
    const user = users[0]
    await api
      .post('/api/users')
      .send(user)

    const newUser = {
      username: user.username,
      name: 'Kohdy',
      passwordHash: '18237981hudh'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('returns 400 if name is not unique', async () => {
    const user = users[0]
    await api
      .post('/api/users')
      .send(user)

    const newUser = {
      username: 'kmrnicholson',
      name: user.name,
      passwordHash: '18237981hudh'
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
