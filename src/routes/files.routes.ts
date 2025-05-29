import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware";
import { DeleteBinnacle, DeleteDocument, GetBinnacleById, GetDocumentById, UpdateBinnacle, UpdateDocument, UploadBinnacle, UploadDocument, GetAllDocuments, GetAllBinnacles } from "../controllers/files.controller";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

router.use(verifyToken);
router.use(upload.single('file'));
// router.use(isAdmin);

router.post("/documents", upload.single(""), UploadDocument);
router.post("/binnacles", upload.single(""), UploadBinnacle);

router.get("/documents/:id", GetDocumentById);
router.get("/binnacles/:id", GetBinnacleById);

router.get("/documents", GetAllDocuments);
router.get("/binnacles", GetAllBinnacles);

router.put("/documents/:id", upload.single(""), UpdateDocument);
router.put("/binnacles/:id", upload.single(""), UpdateBinnacle);

router.delete("/documents/:id", DeleteDocument);
router.delete("/binnacles/:id", DeleteBinnacle);


export default router; 