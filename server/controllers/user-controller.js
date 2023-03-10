import bcrypt from "bcrypt";
import asyncWrapper from "../middlewares/async-wrapper.js";
import { createCustomError } from "../errors/custom-error.js";
import User from "../models/user-model.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ msg: `Retrieved users successfully`, users });
};

const register = asyncWrapper(async (req, res) => {
  const newUser = req.body;
  const encodedPwd = await bcrypt.hash(newUser.password, 10);
  const user = await User.create({ ...newUser, password: encodedPwd });

  res.status(200).json({
    msg: "user registration successfull",
    user: { id: user._id, username: user.username },
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return next(createCustomError("username not found", 400));
  }

  const decodedPwd = await bcrypt.compare(password, user.password);
  if (!decodedPwd) {
    return next(createCustomError("Incorrect Password", 400));
  }

  res.status(200).json({ msg: "Login Successful" });
});

export { getUsers, register, login };
