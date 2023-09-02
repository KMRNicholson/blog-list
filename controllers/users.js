const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.post('/api/users', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.find({ username })

  if (existingUser.length === 1) response.status(409).send()

  if (!password) response.status(400).send()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const result = await user.save()

  if (result) response.status(201).json(result)

  response.status(500).send()
})

module.exports = userRouter
