import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import DB from '../utilities/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (credentials, userType) => {
    try {
        if (!credentials || !userType) {
            throw new Error('Credenciales y tipo de usuario son requeridos');
        }

        if (!['admin', 'student'].includes(userType)) {
            throw new Error('Tipo de usuario no válido');
        }

        let user;
        
        if (userType === 'admin') {
            if (!credentials.email || !credentials.password) {
                throw new Error('Email y contraseña son requeridos');
            }

            const [admins] = await DB.execute(
                "SELECT * FROM admins WHERE email = ?",
                [credentials.email]
            );
            
            if (admins.length === 0) {
                throw new Error('Credenciales inválidas');
            }
            
            user = admins[0];
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
            if (!isPasswordValid) {
                throw new Error('Credenciales inválidas');
            }
            
            const token = jwt.sign(
                { id: user.id, email: user.email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: 'admin'
                }
            };
        } else if (userType === 'student') {
            if (!credentials.documentID || !credentials.password) {
                throw new Error('Documento y contraseña son requeridos');
            }

            const [students] = await DB.execute(
                "SELECT * FROM students WHERE documentID = ?",
                [credentials.documentID]
            );
            
            if (students.length === 0) {
                throw new Error('Credenciales inválidas');
            }
            
            user = students[0];
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
            if (!isPasswordValid) {
                throw new Error('Credenciales inválidas');
            }
            
            const token = jwt.sign(
                { id: user.id, documentID: user.documentID, role: 'student' },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    documentID: user.documentID,
                    role: 'student'
                }
            };
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createTestSession = async (userType) => {
    try {
        if (!userType || !['admin', 'student'].includes(userType)) {
            throw new Error('Tipo de usuario no válido');
        }

        const testUser = {
            id: 'test-' + Date.now(),
            role: userType,
            email: `test-${userType}@example.com`
        };

        const token = jwt.sign(testUser, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            user: testUser
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const verifySession = async (token) => {
    try {
        if (!token) {
            throw new Error('Token no proporcionado');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.role || !['admin', 'student'].includes(decoded.role)) {
            throw new Error('Token inválido: rol no válido');
        }
        
        if (decoded.role === 'admin') {
            const [admins] = await DB.execute(
                "SELECT id, name, email FROM admins WHERE id = ?",
                [decoded.id]
            );
            
            if (admins.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            
            return {
                user: {
                    ...admins[0],
                    role: 'admin'
                }
            };
        } else if (decoded.role === 'student') {
            const [students] = await DB.execute(
                "SELECT id, name, documentID, scenary, stateStudent FROM students WHERE id = ?",
                [decoded.id]
            );
            
            if (students.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            
            return {
                user: {
                    ...students[0],
                    role: 'student'
                }
            };
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        throw new Error(error.message);
    }
}; 