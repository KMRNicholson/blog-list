const dummy = blogs => blogs.likes - blogs.likes + 1

const totalLikes = blogs => {
  if (blogs.length === 1) return blogs[0].length

  if (blogs.length >= 1) {
    const sum = (accumulator, currentValue) => accumulator + currentValue
    return blogs
      .map(blog => blog.likes)
      .reduce(sum, 0)
  }

  return 0
}

const favoriteBlog = blogs => {
  if (blogs.length === 1) return blogs[0]

  if (blogs.length >= 1) {
    const max = (maxLikes, currentLikes) => Math.max(currentLikes, maxLikes)

    const highestLikes = blogs
      .map(blog => blog.likes)
      .reduce(max, 0)

    return blogs.find(blog => blog.likes === highestLikes)
  }

  return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
