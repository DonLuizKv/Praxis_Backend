import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../utilities/database.js';

dotenv.config();

export const login = async (credentials) => {
    try {
        if (!credentials) {
            throw new Error('Credenciales son requeridas');
        }

        if (!credentials.email || !credentials.password) {
            throw new Error('Email y contraseña son requeridos');
        }

        const { email, password } = credentials;

        const [admins] = await pool.query(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        const [students] = await pool.query(
            "SELECT * FROM students WHERE email = ?",
            [email]
        );

        const [user] = admins.length > 0 ? admins : students;

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const register = async (credentials) => {
    try {
        if (!credentials) {
            throw new Error('Credenciales son requeridas');
        }

        const { name, document_id, email, password, role } = credentials;

        if (role === 'admin') {
            if (!name || !email || !password) {
                throw new Error('Todos los campos son requeridos');
            }
        } else if (role === 'student') {
            if (!name || !document_id || !email || !password) {
                throw new Error('Todos los campos son requeridos');
            }
        }

        if (role !== 'admin' && role !== 'student') {
            throw new Error('Rol no válido');
        }

        if (role === 'admin') {
            const [existingAdmin] = await pool.query(
                "SELECT * FROM admins WHERE email = ?",
                [email]
            );

            if (existingAdmin.length > 0) {
                throw new Error('El correo electrónico ya está en uso');
            }
        } else if (role === 'student') {
            const [existingStudent] = await pool.query(
                "SELECT * FROM students WHERE email = ?",
                [email]
            );

            if (existingStudent.length > 0) {
                throw new Error('El correo electrónico ya está en uso');
            }


            const [existingStudentDocumentID] = await pool.query(
                "SELECT * FROM students WHERE document_id = ?",
                [document_id]
            );

            if (existingStudentDocumentID.length > 0) {
                throw new Error('El número de documento ya está en uso');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'admin') {
            await pool.query(
                "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, role]
            );
        } else if (role === 'student') {
            await pool.query(
                "INSERT INTO students (name, document_id, email, password, role) VALUES (?, ?, ?, ?, ?)",
                [name, document_id, email, hashedPassword, role]
            );
        }

        return { message: `Usuario ${role} registrado exitosamente` };
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
            const [admins] = await pool.query(
                "SELECT * FROM admins WHERE id = ?",
                [decoded.id]
            );

            if (admins.length === 0) {
                throw new Error('Usuario no encontrado');
            }
        } else if (decoded.role === 'student') {
            const [students] = await pool.query(
                "SELECT * FROM students WHERE id = ?",
                [decoded.id]
            );

            if (students.length === 0) {
                throw new Error('Usuario no encontrado');
            }
        }

        return { role: decoded.role };
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        throw new Error(error.message);
    }
}; 