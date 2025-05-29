import { CreateBinnacle, CreateDocument, DeleteBinnacle, DeleteDocument, GetAllBinnacles, GetAllDocuments, GetBinnacle, GetDocument, UpdateDocument } from "../models/file.model";
import { verifyField } from "../models/generic.model";
import { Binnacle, Document } from "../utilities/Types";

//& POST - documents
export const uploadDocument = async (document: Document) => {
    const errors = {
        name: "This document already exists",
    }

    for (const key of Object.keys(errors)) {
        const values = document[key as keyof Document];
        const exists = await verifyField("documents", key, values);
        if (exists) {
            throw new Error(errors[key as keyof typeof errors]);
        }
    }

    const response = await CreateDocument(document);
    return response;
}

//& POST - binnacles
export const uploadBinnacle = async (binnacle: Binnacle) => {
    const errors = {
        name: "This Binnacle already exists",
    }

    for (const key of Object.keys(errors)) {
        const values = binnacle[key as keyof Binnacle];
        const exists = await verifyField("binnacles", key, values);
        if (exists) {
            throw new Error(errors[key as keyof typeof errors]);
        }
    }

    const response = await CreateBinnacle(binnacle);
    return response;
}

//$ GET - documents
export const getDocuments = async () => {
    const errors = {
        notFound: "Documents not found",
    }

    const documents = await GetAllDocuments();

    if (documents.length === 0) {
        throw new Error(errors.notFound);
    }

    return documents;
}

//$ GET - binnacles
export const getBinnacles = async () => {
    const errors = {
        notFound: "Binnacles not found",
    }

    const binnacles = await GetAllBinnacles();

    if (binnacles.length === 0) {
        throw new Error(errors.notFound);
    }

    return binnacles;
}

//$ GET - document by id
export const getDocumentById = async (id: number) => {
    const errors = {
        notFound: "Document not found",
    }

    const document = await verifyField("documents", "id", id);

    if (!document) {
        throw new Error(errors.notFound);
    }

    const documents = await GetDocument(id);
    return documents;
}

//$ GET - binnacle by id
export const getBinnacleById = async (id: number) => {
    const errors = {
        notFound: "Binnacle not found",
    }

    const binnacle = await verifyField("binnacles", "id", id);

    if (!binnacle) {
        throw new Error(errors.notFound);
    }

    const binnacles = await GetBinnacle(id);
    return binnacles;
}

//* PUT - document by id
export const updateDocument = async (id: number, updatedDocument: Document) => {
    const errors = {
        name: "This document already exists",
    }

    const document = await verifyField("documents", "id", id);

    if (!document) {
        throw new Error("Document not found");
    }

    for (const key of Object.keys(errors)) {
        const values = updatedDocument[key as keyof Document];
        const exists = await verifyField("documents", key, values);
        if (exists) {
            throw new Error(errors[key as keyof typeof errors]);
        }
    }

    const response = await UpdateDocument(id, updatedDocument);
    return response;
}

//* PUT - binnacle by id
export const updateBinnacle = async (id: number, updatedBinnacle: Binnacle) => {
    const errors = {
        name: "This binnacle already exists",
    }

    const binnacle = await verifyField("binnacles", "id", id);

    if (!binnacle) {
        throw new Error("Binnacle not found");
    }

    for (const key of Object.keys(errors)) {
        const values = updatedBinnacle[key as keyof Binnacle];
        const exists = await verifyField("binnacles", key, values);
        if (exists) {
            throw new Error(errors[key as keyof typeof errors]);
        }
    }
}

//! DELETE - document by id
export const deleteDocument = async (id: number) => {
    const errors = {
        notFound: "Document not found",
    }

    const document = await verifyField("documents", "id", id);

    if (!document) {
        throw new Error(errors.notFound);
    }

    const response = await DeleteDocument(id);
    return response;
}

//! DELETE - binnacle by id
export const deleteBinnacle = async (id: number) => {
    const errors = {
        notFound: "Binnacle not found",
    }

    const binnacle = await verifyField("binnacles", "id", id);

    if (!binnacle) {
        throw new Error(errors.notFound);
    }

    const response = await DeleteBinnacle(id);
    return response;
}
