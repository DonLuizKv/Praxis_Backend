import bcrypt from 'bcryptjs';
import { GetAllDocuments, GetAllBinnacles } from "../models/file.model";
import { Student, Document, Binnacle } from "./Types";
import { Get as GetScenary } from '../models/scenary.model';

export const normalizeStudent = async (student: Student) => {
    const [documents] = await GetAllDocuments();
    const [binnacles] = await GetAllBinnacles();
    const [scenary] = await GetScenary(student.id as number);

    return {
        id: student.id,
        name: student.name,
        identity_document: student.identity_document,
        email: student.email,
        password: student.password,
        state: Boolean(student.state),
        profile_photo: student.profile_photo || "",
        scenary: scenary || "",
        documents: documents || [],
        binnacles: binnacles || []
    };
};


export const ErrorResponse = (error: unknown, clauses: string | string[], message: string) => {
    const err = error as Error;
    const errorMessage = err?.message || "Unknown error";
    const clauseList = Array.isArray(clauses) ? clauses : [clauses];
    const statusCode = clauseList.some(clause => errorMessage.includes(clause)) ? 400 : 500;
    return {
        statusCode,
        body: {
            message,
            error: errorMessage,
        },
    };
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};