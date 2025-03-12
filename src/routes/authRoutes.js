import express from "express";
import { register, sendOtp, verifyOtp, login } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

export default router;
