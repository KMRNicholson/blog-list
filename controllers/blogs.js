const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/api/blogs', async (request, response) => { response.send(await Blog.find({})) })

blogsRouter.get('/api/blogs/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      response.json(blog)
    })
    .catch(error => next(error))
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  if (result) response.status(201).json(result)

  response.status(500).send()
})

module.exports = blogsRouter
