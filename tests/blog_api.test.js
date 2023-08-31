const mongoose = require('mongoose')
const supertest = require('supertest')
const blogs = require('./data/blogs')
const app = require('../app')
const Blog = require('../models/Blog')

mongoose.set('bufferTimeoutMS', 50000)

const api = supertest(app)

describe('get /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject

    await blogs.forEach(async blog => {
      blogObject = new Blog(blog)
      await blogObject.save()
    })
  })

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
  })
})
