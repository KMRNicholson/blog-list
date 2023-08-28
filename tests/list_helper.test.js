const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 3,
    __v: 0
  }
]

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
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(6)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog, equals that blog', () => {
    const listWithOneBlog = [
      blogs[0]
    ]

    const expected = { ...blogs[0] }

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a list with one clear favorite returns that favorite', () => {
    const expected = { ...blogs[2] }

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expected)
  })
})
