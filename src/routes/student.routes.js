import express from "express";
import { CreateStudent, GetStudents, DeleteStudent, UpdateStudent, GetStudentById } from "../controllers/student.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, GetStudents);
router.get("/:id", verifyToken, GetStudentById);
router.post("/", CreateStudent);
router.delete("/:id", DeleteStudent);
router.put("/:id", UpdateStudent);

export default router;