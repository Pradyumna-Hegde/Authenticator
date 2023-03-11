import bcrypt from "bcrypt";
import asyncWrapper from "../middlewares/async-wrapper.js";
import { createCustomError } from "../errors/custom-error.js";
import User from "../models/user-model.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ msg: `Retrieved users successfully`, users });
};

const register = asyncWrapper(async (req, res, next) => {
  const { username, password, email, profile } = req.body;
  if (!username || !password || !email) {
    return next(createCustomError("Please enter the credentials", 400));
  }

  const existUsername = await User.findOne({ username });
  if (existUsername) {
    return next(
      createCustomError(
        "username already exists, please use different username",
        400
      )
    );
  }

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return next(
      createCustomError("email already exists, please use different email", 400)
    );
  }

  const encodedPwd = await bcrypt.hash(password, 10);
  const user = await User.create({
    ...req.body,
    profile: profile || "",
    password: encodedPwd,
  });
  console.log({ data: user });

  res.status(200).json({
    msg: "user registration successfull",
    user: { id: user._id, username: user.username },
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  if ((!username, !password))
    return res.status(400).json({ msg: "Please enter the credentials" });

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
