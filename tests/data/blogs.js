const mongoose = require("mongoose");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: new mongoose.Types.ObjectId("5a422a851b54a676234d17f9"),
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: new mongoose.Types.ObjectId("5a422aa71b54a676234d17d0"),
    likes: 1,
    __v: 0,
  },
];

module.exports = blogs;
