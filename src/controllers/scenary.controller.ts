import { Request, Response } from "express";
import { createScenary, getScenarys, getScenary, updateScenary, deleteScenary } from "../services/scenary.service";
import { ErrorResponse } from "../utilities/utils";

export const CreateScenary = async (req: Request, res: Response): Promise<any> => {
    try {
        await createScenary(req.body);
        return res.status(201).json({ message: 'Scenary created successfully' });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(
            error,
            "already exists",
            "Error to create scenary"
        );
        return res.status(statusCode).json(body);
    }
};

export const GetScenarys = async (req: Request, res: Response): Promise<any> => {
    try {
        const scenarys = await getScenarys();
        return res.status(200).json({ scenarys });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "Error to get scenarys", "Error to get scenarys");
        return res.status(statusCode).json(body);
    }
};

export const GetScenary = async (req: Request, res: Response): Promise<any> => {
    try {
        const scenary = await getScenary(Number(req.params.id));
        return res.status(200).json({ scenary });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to get scenary");
        return res.status(statusCode).json(body);
    }
}

export const UpdateScenary = async (req: Request, res: Response): Promise<any> => {
    try {
        const scenary = await updateScenary(Number(req.params.id), req.body);
        return res.status(200).json({ scenary });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, ["not found", "already exists", "at least one field must be updated"], "Error to update scenary");
        return res.status(statusCode).json(body);
    }
}

export const DeleteScenary = async (req: Request, res: Response): Promise<any> => {
    try {
        const scenary = await deleteScenary(Number(req.params.id));
        return res.status(200).json({ scenary });
    } catch (error: any) {
        const { statusCode, body } = ErrorResponse(error, "not found", "Error to delete scenary");
        return res.status(statusCode).json(body);
    }
}

