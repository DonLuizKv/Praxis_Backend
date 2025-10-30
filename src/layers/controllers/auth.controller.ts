import { Request, Response } from 'express';
import { login, register, verifySession } from '../services/auth.service';
import { ErrorResponse } from '../../utilities/utils';

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const auth = await login(req.body);
        return res.status(200).json(auth);
    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, ["Invalid", "not found"], "Error trying to login");
        return res.status(statusCode).json(body);
    }
};

export const Register = async (req: Request, res: Response): Promise<any> => {
    try {
        await register(req.body);
        return res.status(200).json({ message: "User created successfully" });
    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, ["Required", "already exists", "Not valid role", "not found", "normalizing"], "Error trying to register");
        return res.status(statusCode).json(body);
    }
};

export const VerifySession = async (req: Request, res: Response): Promise<any> => {
    try {
        const tokenHeader = req.headers['x-access-token'] || req.headers['authorization'];

        if (!tokenHeader || typeof tokenHeader !== "string") {
            return res.status(403).json({ error: 'Token required' });
        }

        const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;
        const result = await verifySession(token);
        return res.status(200).json(result);
    } catch (error: any) {
        const { body, statusCode } = ErrorResponse(error, ["Invalid", "not found"], "Error trying to verify session");
        return res.status(statusCode).json(body);
    }
};

// export const CreateTestSession = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { role } = req.body;

//         if (!role || !['admin', 'student'].includes(role)) {
//             return res.status(400).json({ error: 'Tipo de usuario no válido' });
//         }

//         const result = await createTestSession(role);
//         return res.status(200).json({
//             message: 'Sesión de prueba creada con éxito',
//             ...result
//         });
//     } catch (error: any) {
//         const { body, statusCode } = ErrorResponse(error, "", "");
//         return res.status(statusCode).json(body);
//     }
// }; 