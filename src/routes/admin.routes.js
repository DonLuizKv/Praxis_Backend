import express from "express";
import controller from "../controllers/admin.controller.js"
import middlewares from "../middlewares/middlewares.js"

const router = express.Router();

//? Puntos de control (verificadores)
// router.use(middlewares.auth);

//? rutas plurales (acciones generales)
router.post("/admins", controller.create_Admin);
// router.post("/students", adminController.createStudent);
router.get("/admins/get", controller.listAdmins);
// router.get("/students", adminController.getAllStudents);

// //? rutas singulares (acciones especificas)
// router.get("/admins/:id", adminController.getAdminById);
// router.put("/admins/:id", adminController.updateAdmin);
// router.delete("/admins/:id", adminController.deleteAdmin);
// router.post("/students/:id/upload", adminController.uploadDocumentForStudent);
// router.put("/students/:id/name", adminController.updateStudentName);

export default router;