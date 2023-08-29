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

  test('of a list with a tied favorite returns first one encountered', () => {
    const blogsCopy = [...blogs]

    const firstFavorite = blogsCopy[2]
    const tiedFavorite = {
      _id: '5a422a851b54a676234d17f5',
      title: 'Continuous Delivery',
      author: 'Martin Fowler',
      url: 'https://continuousdelivery.com/',
      likes: firstFavorite.likes,
      __v: 0
    }

    blogsCopy.push(tiedFavorite)

    const expected = { ...firstFavorite }

    const result = listHelper.favoriteBlog(blogsCopy)
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog, equals that author and count as one', () => {
    const onlyOne = blogs[0]
    const listWithOneBlog = [
      onlyOne
    ]

    const expected = {
      author: onlyOne.author,
      blogs: 1
    }

    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a list with one dominant author returns that author and count of blogs', () => {
    const authorWithMostBlogs = blogs[1].author

    const expected = {
      author: authorWithMostBlogs,
      blogs: 2
    }

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expected)
  })

  test('of a list with a tied favorite returns first one encountered', () => {
    const blogsCopy = [...blogs]

    const newBlog = {
      _id: '5a422a851b54a676234d17f1',
      title: 'React patterns, volume 2',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 1,
      __v: 0
    }

    blogsCopy.push(newBlog)

    const expected = {
      author: newBlog.author,
      blogs: 2
    }

    const result = listHelper.mostBlogs(blogsCopy)
    expect(result).toEqual(expected)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog, equals that author and likes count', () => {
    const onlyOne = blogs[0]
    const listWithOneBlog = [
      onlyOne
    ]

    const expected = {
      author: onlyOne.author,
      likes: onlyOne.likes
    }

    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a list with one most liked author returns that author and likes count', () => {
    const authorWithMostLikes = blogs[1].author

    const expected = {
      author: authorWithMostLikes,
      likes: 5
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expected)
  })

  test('of a list with a tied favorite returns first one encountered', () => {
    const blogsCopy = [...blogs]

    const newBlog = {
      _id: '5a422a851b54a676234d17f1',
      title: 'React patterns, volume 2',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 4,
      __v: 0
    }

    blogsCopy.push(newBlog)

    const expected = {
      author: newBlog.author,
      likes: 5
    }

    const result = listHelper.mostLikes(blogsCopy)
    expect(result).toEqual(expected)
  })
})
