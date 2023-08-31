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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const transformedBlog = {
      ...returnedObject,
      id: returnedObject._id.toString()
    }

    delete transformedBlog._id
    delete transformedBlog.__v
    return transformedBlog
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
