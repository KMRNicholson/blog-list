const testRouter = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')

testRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).send()
})

module.exports = testRouter
