const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.get('/api/blogs/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      response.json(blog)
    })
    .catch(error => next(error))
})

blogsRouter.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
