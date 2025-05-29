import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token || typeof token !== 'string') {
        return res.status(403).json({ error: 'Se requiere un token para la autenticación' });
    }

    try {
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (req.user && typeof req.user !== 'string' && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Se requieren privilegios de administrador' });
};

export const isStudent = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (req.user && typeof req.user !== 'string' && req.user.role === 'student') {
        return next();
    }
    return res.status(403).json({ error: 'Se requieren privilegios de estudiante' });
};
