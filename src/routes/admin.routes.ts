import express from "express";
import { CreateAdmin, GetAdmins, GetAdminById, UpdateAdmin, DeleteAdmin } from "../controllers/admin.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(verifyToken);

router.post("/", CreateAdmin);
router.get("/", GetAdmins);
router.get("/:id", GetAdminById);
router.put("/:id", UpdateAdmin);
router.delete("/:id", DeleteAdmin);

export default router;