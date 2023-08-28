const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    minLength: 3,
    required: true
  },
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
