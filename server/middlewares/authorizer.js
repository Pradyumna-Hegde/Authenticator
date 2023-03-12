import jwt from "jsonwebtoken";
import asyncWrapper from "./async-wrapper.js";
import { createCustomError } from "../errors/custom-error.js";
import "dotenv/config";

const authorize = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token === undefined) {
    return next(createCustomError("Token expired", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
export { authorize, localVariables };
