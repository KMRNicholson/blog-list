require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testRouter = require("./controllers/testing");

mongoose.set("strictQuery", false);

logger.info("connecting to db");

const mongoDBUri =
  config.NODE_ENV === "test" ? config.TEST_MONGODB_URI : config.MONGODB_URI;

mongoose
  .connect(mongoDBUri)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const app = express();
app.use(express.static("frontend"));

app.use(middleware.cors);
app.use(middleware.json);
app.use(middleware.requestLogger);
app.use("/api/blogs", middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (config.NODE_ENV === "test") {
  app.use("/api/testing", testRouter);
}

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
