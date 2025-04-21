import express from "express";
import { Login, VerifySession, CreateTestSession } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", Login);
router.get("/verify", verifyToken, VerifySession);
router.post('/test-session', CreateTestSession);

export default router; 