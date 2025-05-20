import express from "express";
import { UploadDocument, UploadBinnacle, GetDocuments, GetBinnacles, GetDocumentByStudentId, GetBinnacleByStudentId, UpdateDocument, UpdateBinnacle, DeleteDocument, DeleteBinnacle } from "../controllers/files.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.use(verifyToken);
// router.use(isAdmin);

router.get("/documents", GetDocuments);
router.get("/binnacles", GetBinnacles);

router.post("/documents", upload.single("file"), UploadDocument);
router.post("/binnacles", upload.single("file"), UploadBinnacle);

router.get("/documents/:id", GetDocumentByStudentId);
router.get("/binnacles/:id", GetBinnacleByStudentId);

router.put("/documents/:id", upload.array("file"), UpdateDocument);
router.put("/binnacles/:id", upload.array("file"), UpdateBinnacle);

router.delete("/documents/:id", DeleteDocument);
router.delete("/binnacles/:id", DeleteBinnacle);

export default router; 