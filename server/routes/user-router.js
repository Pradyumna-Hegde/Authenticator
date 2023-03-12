import { Router } from "express";
import { authorize, localVariables } from "../middlewares/authorizer.js";
import {
  getUsers,
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
} from "../controllers/user-controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:username", getUser);

router.post("/register", register);
router.post("/login", login);

router.patch("/update", authorize, updateUser);

router.get("/generateOTP", localVariables, generateOTP);

export default router;
