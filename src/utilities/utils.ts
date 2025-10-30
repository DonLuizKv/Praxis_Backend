import bcrypt from 'bcryptjs';
import { GetAllDocuments, GetAllBinnacles } from "../layers/repositories/file.repository";
import { Student, Document, Binnacle } from "./Types";
import { Get as GetScenary } from '../layers/repositories/scenary.repository';

export const normalizeStudent = async (student: Student) => {
    const documents = await GetAllDocuments();
    const binnacles = await GetAllBinnacles();
    const scenary = await GetScenary(student.id as number);

    const listDocuments = documents.filter(
        (document) => document.student_id === student.id
    );

    const listBinnacles = binnacles.filter(
        (binnacle) => binnacle.student_id === student.id
    );

    return {
        id: student.id,
        name: student.name,
        identity_document: student.identity_document,
        email: student.email,
        state: Boolean(student.state),
        profile_photo: student.profile_photo || "/",
        scenary: scenary.find((scenary) => scenary.student_id === student.id),
        documents: {
            arl: listDocuments.find((doc) => doc.document_type === "arl") || null,
            coverLetter: listDocuments.find((doc) => doc.document_type === "coverLetter") || null,
        },
        binnacles: listBinnacles || [],
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