const mongoose = require('mongoose')
const helper = require('./helper')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  passwordHash: {
    type: String,
    minLength: 8,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

const removePasswordHash = {
  transform: (document, returnedObject) => {
    const transformedUser = { ...returnedObject }
    delete transformedUser.passwordHash
    return transformedUser
  }
}

userSchema.set('toJSON', helper.transformId)
userSchema.set('toJSON', removePasswordHash)

const User = mongoose.model('User', userSchema)

module.exports = User