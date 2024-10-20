import { Router } from "express";
import { login, logout, signUp, verifyOtp } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;
