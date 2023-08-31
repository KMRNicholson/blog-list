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

  test('returns blogs with property "id"', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
  })
})

describe('post /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('successfully creates a blog', async () => {
    const blog = {
      title: 'React',
      author: 'Michael',
      url: 'https://reactpatterns.com/',
      likes: 1
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(201)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(1)
  })
})
