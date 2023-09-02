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

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
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

  test('returns specific blog when given id', async () => {
    const expected = blogs[0]
    const response = await api.get(`/api/blogs/${expected._id}`)
    const blog = response.body

    expect(expected._id).toEqual(blog.id)
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

  test('default likes to 0 if not provided in request body', async () => {
    const blog = {
      title: 'React',
      author: 'Michael',
      url: 'https://reactpatterns.com/'
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const createdBlog = response.body[0]

    expect(createdBlog.likes).toEqual(0)
  })

  test('returns 400 Bad Request if missing url', async () => {
    const blog = {
      title: 'React',
      author: 'Michael'
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })

  test('returns 400 Bad Request if missing url', async () => {
    const blog = {
      author: 'Michael',
      url: 'https://reactpatterns.com/'
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })
})
