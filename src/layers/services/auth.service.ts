import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { comparePassword, hashPassword, normalizeStudent } from '../../utilities/utils';
import { User, Student } from '../../utilities/Types';
import { GetAdmin, GetStudent, GenerateStudent, GenerateAdmin } from '../repositories/auth.repository';

dotenv.config();

interface SessionData {
    id: number;
    name: string;
    role: 'admin' | 'student';
    email: string;
}

const SECRET: string = process.env.JWT_SECRET as string;

export const login = async (credentials: User) => {

    const errors = {
        empty: "Required field",
        email: "Invalid email",
        password: "Invalid password",
        user: "Invalid credentials",
        env: "Environment variables not found"
    }

    if (!credentials.email || !credentials.password) {
        throw new Error(errors.empty);
    }

    const existingAdmin = await GetAdmin(credentials.email);
    const existingStudent = await GetStudent(credentials.email);

    const [user] = existingAdmin.length > 0 ? existingAdmin : existingStudent;

    const isPasswordValid = await comparePassword(credentials.password, user.password);
    const isEmailValid = user.email === credentials.email;

    if (!isPasswordValid) {
        throw new Error(errors.password);
    }

    if (!isEmailValid) {
        throw new Error(errors.email);
    }

    const payload: SessionData = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    }

    if (!SECRET) {
        throw new Error(errors.env);
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "24h" });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    };

};

export const register = async (credentials: User) => {

    const emptyErrors = {
        name: "Required name",
        email: "Required email",
        password: "Required password",
        identity_document: "Required identity document",
    }

    const AlreadyExistsErrors = {
        email: "Email already exists",
        identity_document: "Identity document already exists",
    }

    //? - Verificamos los campos del estudiante, ya que por ahora
    //? - los admin/s no se registran
    for (const field of Object.keys(emptyErrors)) {
        const valuesToCheck = credentials[field as keyof User];
        const isEmpty = valuesToCheck === "" || valuesToCheck === null || valuesToCheck === undefined;
        if (isEmpty) {
            throw new Error(emptyErrors[field as keyof typeof emptyErrors]);
        }
    }

    if (credentials.role !== 'admin' && credentials.role !== 'student') {
        throw new Error('Not valid role');
    }

    const existingAdmin = await GetAdmin(credentials.email);
    const existingStudent = await GetStudent(credentials.email);

    const [user] = existingAdmin.length > 0 ? existingAdmin : existingStudent;

    if (user) {
        for (const field of Object.keys(AlreadyExistsErrors)) {
            const valuesToCheck = credentials[field as keyof User];
            const isSame = valuesToCheck === user[field as keyof User];
            if (isSame) {
                throw new Error(AlreadyExistsErrors[field as keyof typeof AlreadyExistsErrors]);
            }
        }
    }

    const hashedPassword = await hashPassword(credentials.password);

    const newUser = {
        ...credentials,
        password: hashedPassword,
        profile_photo: ""
    }

    if (credentials.role === 'admin') {
        await GenerateAdmin(newUser as User);
    } else if (credentials.role === 'student') {
        await GenerateStudent(newUser as Student);
    }

    const normalizedStudent = await normalizeStudent(newUser as Student);

    if (!normalizedStudent) {
        throw new Error('Error normalizing student');
    }

    return normalizedStudent;
};

// export const createTestSession = async (userType: "admin" | "student") => {

//     if (!userType || !['admin', 'student'].includes(userType)) {
//         throw new Error('Tipo de usuario no válido');
//     }

//     const testUser = {
//         id: 'test-' + Date.now(),
//         role: userType,
//         email: `test-${userType}@example.com`
//     };

//     const token = jwt.sign(testUser, SECRET, { expiresIn: '1h' });

//     return {
//         token,
//         user: testUser
//     };
// } catch (error: any) {
//     throw new Error(error.message);
// }
// };

export const verifySession = async (token: string) => {

    const errors = {
        token: "Token not provided",
        invalid: "Invalid token",
        role: "Invalid role",
        notFound: "User not found",
    }    

    if (!token) {
        throw new Error(errors.token);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as SessionData;

    if (!decoded.role || (decoded.role !== 'admin' && decoded.role !== 'student')) {
        throw new Error(errors.role);
    }

    const admin = await GetAdmin(decoded.email);
    const student = await GetStudent(decoded.email);

    if (admin.length === 0 && decoded.role === 'admin') {
        throw new Error(errors.notFound);
    }

    if (student.length === 0 && decoded.role === 'student') {
        throw new Error(errors.notFound);
    }

    return {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
        name: decoded.name
    };
}; 