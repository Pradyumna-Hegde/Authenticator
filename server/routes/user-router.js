import { Router } from "express";
import { authorize, localVariables } from "../middlewares/authorizer.js";
import {
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
} from "../controllers/user-controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:username", getUser);
router.get("/verifyOTP/:otp", verifyOTP);
router.get("/generateOTP", localVariables, generateOTP);
router.get("/createResetSession", createResetSession);

router.route("/authenticate").post(checkUser, (req, res) => res.end());
router.post("/register", register);
router.post("/login", checkUser, login);

router.patch("/update", authorize, updateUser);
router.patch("/resetPassword", checkUser, resetPassword);

export default router;
