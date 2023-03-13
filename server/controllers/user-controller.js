import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "otp-generator";
import asyncWrapper from "../middlewares/async-wrapper.js";
import { createCustomError } from "../errors/custom-error.js";
import User from "../models/user-model.js";
import "dotenv/config";

// Middleware for checking user.
const checkUser = asyncWrapper(async (req, res, next) => {
  const { username } = req.method === "GET" ? req.params : req.body;
  const exist = await User.findOne({ username });
  if (!exist || null) {
    return next(createCustomError("user does not exist", 400));
  }
  req.user = username;
  next();
});

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
  console.log(user);
  // if (!user) {
  //   return next(createCustomError("username not found", 400));
  // }

  const decodedPwd = await bcrypt.compare(password, user.password);
  if (!decodedPwd) {
    return next(createCustomError("Incorrect Password", 400));
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.status(200).json({ msg: "Login Successful", data: { username, token } });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return next(createCustomError(`user with ${username} not exist`, 400));
  }

  res.status(200).json({ msg: "Retrieved user successfully", user });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.user;
  const user =
    (await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    })) || null;

  if (!user) {
    return next(createCustomError(`Failed to update the user`, 400));
  }

  res.status(200).json({
    msg: "user updated",
    user: { id: user._id, username: user.username },
  });
});

const generateOTP = asyncWrapper(async (req, res, next) => {
  req.app.locals.OTP = generator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).json({ OTP: req.app.locals.OTP });
});

const verifyOTP = asyncWrapper(async (req, res, next) => {
  const { otp } = req.params;

  if (parseInt(req.app.locals.OTP) === parseInt(otp)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).json({ msg: "verification successful!" });
  }

  next(createCustomError("Invalid OTP", 400));
});

const createResetSession = asyncWrapper(async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // allows to use this route only once
    res.status(201).json({ msg: "access granted" });
  }
  next(createCustomError("session expired", 400));
});

const resetPassword = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;

  if (!req.app.locals.resetSession) {
    return next(createCustomError("Session Expired, Login again", 400));
  }

  const encodedPwd = await bcrypt.hash(password, 10);
  const updatedUser = await User.findOneAndUpdate(
    { username },
    { password: encodedPwd },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    return next(createCustomError("Failed to update the password", 400));
  }

  res.status(200).json({ msg: "Password updated!" });
});

export {
  checkUser,
  getUsers,
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
