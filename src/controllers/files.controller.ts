import { Request, Response } from "express";
import { ErrorResponse } from "../utilities/utils";
import { deleteDocument, deleteBinnacle, getDocumentById, getBinnacleById, getDocuments, getBinnacles, updateDocument, updateBinnacle, uploadDocument, uploadBinnacle } from "../services/files.service";

export const UploadDocument = async (req: Request, res: Response): Promise<any> => {
    try {
        await uploadDocument(req.body);
        return res.status(201).json({ message: "Document created successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "already exists", "Error to create document");
        return res.status(statusCode).json(body);
    }
}

export const UploadBinnacle = async (req: Request, res: Response): Promise<any> => {
    try {
        await uploadBinnacle(req.body);
        return res.status(201).json({ message: "Binnacle created successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "already exists", "Error to create binnacle");
        return res.status(statusCode).json(body);
    }
}

export const GetDocumentById = async (req: Request, res: Response): Promise<any> => {
    try {
        const document = await getDocumentById(Number(req.params.id));
        return res.status(200).json(document);
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get document");
        return res.status(statusCode).json(body);
    }
}

export const GetBinnacleById = async (req: Request, res: Response): Promise<any> => {
    try {
        const binnacle = await getBinnacleById(Number(req.params.id));
        return res.status(200).json(binnacle);
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get binnacle");
        return res.status(statusCode).json(body);
    }
}

export const GetAllDocuments = async (req: Request, res: Response): Promise<any> => {
    try {
        const documents = await getDocuments();
        return res.status(200).json(documents);
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get all documents");
        return res.status(statusCode).json(body);
    }
}   

export const GetAllBinnacles = async (req: Request, res: Response): Promise<any> => {
    try {
        const binnacles = await getBinnacles();
        return res.status(200).json(binnacles);
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get all binnacles");
        return res.status(statusCode).json(body);
    }
}

export const UpdateDocument = async (req: Request, res: Response): Promise<any> => {
    try {
        await updateDocument(Number(req.params.id), req.body);
        return res.status(200).json({ message: "Document updated successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, ["not found", "already exists"], "Error to update document");
        return res.status(statusCode).json(body);
    }
}

export const UpdateBinnacle = async (req: Request, res: Response): Promise<any> => {
    try {
        await updateBinnacle(Number(req.params.id), req.body);
        return res.status(200).json({ message: "Binnacle updated successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to update binnacle");
        return res.status(statusCode).json(body);
    }
}

export const DeleteDocument = async (req: Request, res: Response): Promise<any> => {
    try {
        await deleteDocument(Number(req.params.id));
        return res.status(200).json({ message: "Document deleted successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to delete document");
        return res.status(statusCode).json(body);
    }
}

export const DeleteBinnacle = async (req: Request, res: Response): Promise<any> => {
    try {
        await deleteBinnacle(Number(req.params.id));
        return res.status(200).json({ message: "Binnacle deleted successfully" });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to delete binnacle");
        return res.status(statusCode).json(body);
    }
}















