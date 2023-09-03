const express = require('express')
const cors = require('cors')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return next(error)
}

const tokenExtractor = (request, response, next) => {
  if (request.method === 'GET' || request.method === 'PUT') return next()
  const authorization = request.get('Authorization')
  const genericMsg = 'Unauthorized'

  if (!authorization) {
    logger.error('Missing authorization header')
    response.status(401).send({ error: genericMsg })
    return next()
  }

  request.token = authorization.replace('Bearer ', '')
  return next()
}

const userExtractor = (request, response, next) => {
  if (request.method === 'GET' || request.method === 'PUT') return next()
  let decodedToken = null
  const genericMsg = 'Unauthorized'
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch {
    logger.error('Token verification failed')
    response.status(401).send({ error: genericMsg })
    return next()
  }

  request.user = { ...decodedToken }
  return next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  cors: cors(),
  json: express.json(),
  tokenExtractor,
  userExtractor
}
