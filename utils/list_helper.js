const _ = require('lodash')

const dummy = blogs => {
  console.log(blogs)
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 1) return _.first(blogs).likes

  if (blogs.length >= 1) {
    const sum = (accumulator, currentValue) => accumulator + currentValue
    return blogs
      .map(blog => blog.likes)
      .reduce(sum, 0)
  }

  return 0
}

const favoriteBlog = blogs => {
  if (blogs.length === 1) return _.first(blogs)

  if (blogs.length >= 1) {
    const max = (maxLikes, currentLikes) => Math.max(currentLikes, maxLikes)

    const highestLikes = blogs
      .map(blog => blog.likes)
      .reduce(max, 0)

    return blogs.find(blog => blog.likes === highestLikes)
  }

  return null
}

const mostBlogs = blogs => {
  if (blogs.length === 1) {
    return {
      author: _.first(blogs).author,
      blogs: blogs.length
    }
  }

  if (blogs.length >= 1) {
    const countedBlogs = _.countBy(blogs, 'author')
    const formattedList = _.map(countedBlogs, (count, author) => ({ author, blogs: count }))
    const sortedList = _.orderBy(formattedList, 'blogs', 'desc')

    return _.head(sortedList)
  }

  return null
}

const mostlikes = blogs => {
  console.log('not implemented yet!', blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlikes
}
