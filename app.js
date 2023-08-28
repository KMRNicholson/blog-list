const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('connecting to db')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const app = express()

app.use(middleware.cors)
app.use(middleware.json)
app.use(middleware.requestLogger)

app.use(blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
