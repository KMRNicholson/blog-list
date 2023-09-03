require('dotenv').config()

const { MONGODB_URI } = process.env
const { TEST_MONGODB_URI } = process.env
const { PORT } = process.env
const { NODE_ENV } = process.env

module.exports = {
  MONGODB_URI,
  TEST_MONGODB_URI,
  PORT,
  NODE_ENV
}
