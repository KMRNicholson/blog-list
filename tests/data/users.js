const mongoose = require('mongoose')

const users = [
  {
    _id: '5a422a851b54a676234d17f9',
    username: 'mchan',
    name: 'Michael Chan',
    passwordHash: '8dui12982e1a',
    blogs: [
      new mongoose.Types.ObjectId('5a422a851b54a676234d17f7')
    ],
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d0',
    username: 'edijk',
    name: 'Edsger W. Dijkstra',
    passwordHash: '9198dji91uh',
    blogs: [
      new mongoose.Types.ObjectId('5a422aa71b54a676234d17f8')
    ],
    __v: 0
  }
]

module.exports = users
