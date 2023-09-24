const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.send(blogs)
})

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })

  if (blog) response.json(blog)

  response.status(404).send()
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) response.status(404).send()

  const user = await User.findById(request.user.id)

  if (blog.user.toString() !== user._id.toString()) response.status(401).json({ error: 'Unauthorized' })

  await Blog.deleteOne(blog)
  response.status(204).send()
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const data = request.body
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    await Blog.updateOne({ _id: blog._id }, data, { runValidators: true })
    response.status(204).send()
  }
  response.status(404).send()
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const data = request.body
  if (!data.likes) data.likes = 0

  const user = await User.findById(request.user.id)
  data.user = user._id

  const blog = new Blog(data)
  const savedBlog = await blog.save()

  if (savedBlog) {
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    const body = await Blog.findById(blog._id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(body)
  }
})

module.exports = blogsRouter
