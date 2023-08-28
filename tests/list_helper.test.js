const listHelper = require('../utils/list_helper')
const blogs = require('./data/blogs')

test('dummy function returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      blogs[0]
    ]

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(blogs[0].likes)
  })

  test('of a bigger list is calculated correctly', () => {
    const sum = (accumulator, currentValue) => accumulator + currentValue
    const expected = blogs
      .map(blog => blog.likes)
      .reduce(sum, 0)

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(expected)
  })
})
