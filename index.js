require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use(blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
