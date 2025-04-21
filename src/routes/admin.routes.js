import express from "express";
import { CreateAdmin, GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin } from "../controllers/admin.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.post("/", CreateAdmin);
router.get("/", GetAdmins);
router.get("/:id", GetAdminById);
router.put("/:id", UpdateAdmin);
router.delete("/:id", DeleteAdmin);

export default router;