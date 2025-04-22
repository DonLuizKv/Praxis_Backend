import express from "express";
import { Login, VerifySession, CreateTestSession, Register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/verify", VerifySession);
router.post('/test-session', CreateTestSession);

export default router; 