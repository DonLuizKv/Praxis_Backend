import { Create, Delete, Get, GetAll, Update } from "../models/admin.model";
import { verifyField } from "../models/generic.model";
import { Admin } from "../utilities/Types";

//& POST
export const createAdmin = async (admin: Admin) => {
    const errors = {
        email: "This email is already in use",
        name: "This name is already in use",
    };

    for (const field of Object.keys(errors)) {
        const value = admin[field as keyof Admin];
        const existInDB = await verifyField("admins", field, value);
        if (existInDB) {
            throw new Error(errors[field as keyof typeof errors]);
        }
    }

    const result = await Create(admin);
    return result;
}

//$ GET
export const getAdmins = async () => {
    const errors = {
        notFound: "Admins not found",
    }

    const admins = await GetAll();

    if (admins.length === 0) {
        throw new Error(errors.notFound);
    }

    return admins;
}

//$ GET BY ID
export const getAdminById = async (id: number) => {
    const errors = {
        notFound: "Admin not found",
    }

    const admin = await Get(id);

    if (admin.length === 0) {
        throw new Error(errors.notFound);
    }

    return admin;
}

//! DELETE
export const deleteAdmin = async (id: number) => {
    const errors = {
        notFound: "Admin not found",
    }

    const admin = await Get(id);

    if (admin.length === 0) {
        throw new Error(errors.notFound);
    }

    const result = await Delete(id);
    return result;
}

//# UPDATE
export const updateAdmin = async (id: number, updatedAdmin: Admin) => {
    const errors = {
        notFound: "Admin not found",
        email: "This email is already in use",
        name: "This name is already in use",
    }

    const admin = await Get(id);

    if (admin.length === 0) {
        throw new Error(errors.notFound);
    }

    for (const field of Object.keys(errors)) {
        const value = updatedAdmin[field as keyof Admin];
        const existInDB = await verifyField("admins", field, value);
        if (existInDB) {
            throw new Error(errors[field as keyof typeof errors]);
        }
    }

    const result = await Update(id, updatedAdmin);
    return result;
}





