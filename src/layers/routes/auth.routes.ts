import express from "express";
import { Login, Register, VerifySession } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/verify", VerifySession);
// router.post('/test-session', CreateTestSession);

export default router; 