import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware";
import { CreateScenary, GetScenarys, GetScenary, UpdateScenary, DeleteScenary } from "../controllers/scenary.controller";

const router = express.Router();

router.use(verifyToken);

router.post("/", CreateScenary);
router.get("/", GetScenarys);
router.get("/:id", GetScenary);
router.put("/:id", UpdateScenary);
router.delete("/:id", DeleteScenary);


export default router;