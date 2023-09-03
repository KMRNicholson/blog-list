const mongoose = require('mongoose')
const supertest = require('supertest')
const users = require('./data/users')
const app = require('../app')
const User = require('../models/User')

mongoose.set('bufferTimeoutMS', 50000)

const api = supertest(app)

describe('post /api/login', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = users.map(user => new User(user))
    const promises = userObjects.map(user => user.save())
    await Promise.all(promises)
  })

  test('successfully logs in with a correct password', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Kohdy',
      password: 'securePwd1'
    }

    await api
      .post('/api/users')
      .send(user)

    const loginData = {
      username: user.username,
      password: user.password
    }

    await api
      .post('/api/login')
      .send(loginData)
      .expect(200)
  })

  test('successful login returns username, name and token', async () => {
    const user = {
      username: 'kmrnicholson',
      name: 'Kohdy',
      password: 'securePwd1'
    }

    await api
      .post('/api/users')
      .send(user)

    const loginData = {
      username: user.username,
      password: user.password
    }

    const { body } = await api
      .post('/api/login')
      .send(loginData)

    expect(body.username).toBeDefined()
    expect(body.name).toBeDefined()
    expect(body.token).toBeDefined()
  })

  test('unsuccessful login returns generic message if user exists', async () => {
    const user = users[0]

    const loginData = {
      username: user.username,
      password: 'wrongPwd'
    }

    const { statusCode, body } = await api
      .post('/api/login')
      .send(loginData)

    expect(statusCode).toEqual(401)
    expect(body.error).toEqual('invalid username or password')
  })

  test('unsuccessful login returns generic message if user exists', async () => {
    const loginData = {
      username: 'wrongUser',
      password: 'wrongPwd'
    }

    const { statusCode, body } = await api
      .post('/api/login')
      .send(loginData)

    expect(statusCode).toEqual(401)
    expect(body.error).toEqual('invalid username or password')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
