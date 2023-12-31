const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.send(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.find({ username });

  if (existingUser.length === 1) response.status(409).send();

  const invalidPassword = {
    error: "Invalid password. Ensure password is 8 characters long.",
  };
  if (!password) response.status(400).send(invalidPassword);
  if (password.length < 8) response.status(400).send(invalidPassword);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const result = await user.save();

  if (result) response.status(201).json(result);

  response.status(500).send();
});

module.exports = userRouter;
