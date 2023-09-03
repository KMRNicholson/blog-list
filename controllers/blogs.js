const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (!authorization) return null

  return authorization.replace('Bearer ', '')
}

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.send(blogs)
})

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)

  response.status(404).send()
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    await Blog.deleteOne(blog)
    response.status(204).send()
  }
  response.status(404).send()
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const data = request.body
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    await Blog.updateOne({}, data, { runValidators: true })
    response.status(204).send()
  }
  response.status(404).send()
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const data = request.body
  if (!data.likes) data.likes = 0

  const genericMsg = 'Unauthorized'

  const token = getTokenFrom(request)
  const { id } = jwt.verify(token, process.env.SECRET)
  if (!id) response.status(401).json({ error: genericMsg })

  const user = await User.findById(id)
  data.user = user._id

  const blog = new Blog(data)
  const savedBlog = await blog.save()

  if (savedBlog) {
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }

  response.status(500).send()
})

module.exports = blogsRouter
