const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

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

  const blog = new Blog(data)
  const result = await blog.save()

  if (result) response.status(201).json(result)

  response.status(500).send()
})

module.exports = blogsRouter
