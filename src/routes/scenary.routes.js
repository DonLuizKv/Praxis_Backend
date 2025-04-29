import express from "express";
import { CreateScenary, GetScenarys } from "../controllers/scenary.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.post("/", CreateScenary);
router.get("/", GetScenarys);

export default router;