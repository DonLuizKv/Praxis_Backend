import express from "express";
import { CreateStudent, GetStudents, DeleteStudent, UpdateStudent, GetStudent } from "../controllers/student.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = express.Router();

router.use(verifyToken);

router.get("/", GetStudents);
router.get("/:id", GetStudent);
router.post("/", CreateStudent);
router.delete("/:id", DeleteStudent);
router.put("/:id", UpdateStudent);

export default router;