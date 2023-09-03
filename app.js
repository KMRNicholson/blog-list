require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to db')

const mongoDBUri = config.NODE_ENV === 'test'
  ? config.TEST_MONGODB_URI
  : config.MONGODB_URI

mongoose.connect(mongoDBUri)
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
app.use('/api/blogs', middleware.userIdExtractor)

app.use(blogRouter)
app.use(userRouter)
app.use(loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
