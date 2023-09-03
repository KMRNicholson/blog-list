const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/api/login', async (request, response) => {
  const { username, password } = request.body
  const obfuscatedMessage = 'invalid username or password'

  const user = await User.findOne({ username })
  if (user === null) response.status(401).json({ error: obfuscatedMessage })

  const correctPassword = await bcrypt.compare(password, user.passwordHash)
  if (!correctPassword) {
    response.status(401).json({ error: obfuscatedMessage })
  }

  const userInfo = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userInfo, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
