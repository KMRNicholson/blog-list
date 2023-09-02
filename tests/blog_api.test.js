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
})

describe('get /api/blogs/:id', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
  })

  test('returns specific blog when given id', async () => {
    const expected = blogs[0]
    const response = await api.get(`/api/blogs/${expected._id}`)
    const blog = response.body

    expect(expected._id).toEqual(blog.id)
  })

  test('return 404 not found when given incorrect id', async () => {
    await api
      .get('/api/blogs/64f32597258c7a1556d37525')
      .expect(404)
  })

  test('return 500 internal error when given invalid id', async () => {
    await api
      .get('/api/blogs/123-123')
      .expect(500)
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

    await api
      .post('/api/blogs')
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

    await api
      .post('/api/blogs')
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

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })

  test('returns 400 Bad Request if missing title', async () => {
    const blog = {
      author: 'Michael',
      url: 'https://reactpatterns.com/'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })

  test('returns 400 Bad Request if invalid author', async () => {
    const blog = {
      title: 'React',
      author: 'Mi',
      url: 'https://reactpatterns.com/'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })
})

describe('delete /api/blogs/:id', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
  })

  test('deletes blog when given correct id', async () => {
    const before = await api.get('/api/blogs')
    const beforeDel = before.body
    const blog = beforeDel[0]

    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const after = await api.get('/api/blogs')
    const afterDel = after.body
    expect(afterDel).toHaveLength(beforeDel.length - 1)
  })

  test('return 404 not found when given incorrect id', async () => {
    await api
      .delete('/api/blogs/64f32597258c7a1556d37525')
      .expect(404)
  })

  test('return 500 internal error when given invalid id', async () => {
    await api
      .delete('/api/blogs/123-123')
      .expect(500)
  })
})

describe('put /api/blogs/:id', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
  })

  test('updates blog as json', async () => {
    const blog = { ...blogs[0] }
    blog.title = 'New Title'

    await api
      .put(`/api/blogs/${blog._id}`)
      .send(blog)
      .expect(204)

    const after = await api.get(`/api/blogs/${blog._id}`)
    const afterUpdate = after.body
    expect(afterUpdate.title).toEqual(blog.title)
  })

  test('returns 400 Bad Request if invalid author', async () => {
    const blog = { ...blogs[0] }
    blog.author = 'Mi'

    await api
      .put(`/api/blogs/${blog._id}`)
      .send(blog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const savedBlogs = response.body

    expect(savedBlogs).toHaveLength(0)
  })

  test('return 404 not found when given incorrect id', async () => {
    await api
      .put('/api/blogs/64f32597258c7a1556d37525')
      .expect(404)
  })

  test('return 500 internal error when given invalid id', async () => {
    await api
      .put('/api/blogs/123-123')
      .expect(500)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
