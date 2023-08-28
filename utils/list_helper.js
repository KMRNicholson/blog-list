const dummy = blogs => 1

const totalLikes = blogs => {
  let result = 0

  if (blogs.length === 1) result = blogs[0].length

  if (blogs.length >= 1) {
    const sum = (accumulator, currentValue) => accumulator + currentValue
    result = blogs
      .map(blog => blog.likes)
      .reduce(sum, 0)
  }

  return result
}

module.exports = {
  dummy,
  totalLikes
}
