const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use(blogRouter)

const port = config.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
