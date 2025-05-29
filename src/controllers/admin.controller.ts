import { Request, Response } from "express";
import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from "../services/admin.service";
import { ErrorResponse } from "../utilities/utils";

export const CreateAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        await createAdmin(req.body);
        return res.status(201).json({ message: 'Admin created successfully' });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error, 
            "already in use", 
            "Failed to create admin"
        );
        return res.status(statusCode).json(body);
    }
};

export const GetAdmins = async (req: Request, res: Response): Promise<any> => {
    try {
        const consult = await getAdmins();
        return res.status(200).json({ admins: consult });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error, 
            "Failed to get admins", 
            "Failed to get admins"
        );
        return res.status(statusCode).json(body);
    }
};

export const GetAdminById = async (req: Request, res: Response): Promise<any> => {
    try {
        const consult = await getAdminById(Number(req.params.id));
        return res.status(200).json({ admin: consult });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error, 
            "not found", 
            "Failed to get admin"
        );
        return res.status(statusCode).json(body);
    }
};

export const UpdateAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        await updateAdmin(Number(req.params.id), req.body);
        return res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error, 
            ["not found", "already in use"], 
            "Failed to update admin"
        );
        return res.status(statusCode).json(body);
    }
};

export const DeleteAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        await deleteAdmin(Number(req.params.id));
        return res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error, 
            "not found", 
            "Failed to delete admin"
        );
        return res.status(statusCode).json(body);
    }
};

