const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/api/blogs', async (request, response) => { response.send(await Blog.find({})) })

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(await Blog.findById(request.params.id))

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
