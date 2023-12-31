const mongoose = require("mongoose");
const helper = require("./helper");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    minLength: 3,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  comments: [String],
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

blogSchema.set("toJSON", helper.transform());

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
