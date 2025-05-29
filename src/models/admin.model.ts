import pool from "../utilities/Database";
import { Admin } from "../utilities/Types.js";
import { RowDataPacket } from "mysql2";

export const Create = async (admin: Admin) => {
    const query = "INSERT INTO admins (name, email, role, password) VALUES (?, ?, ?, ?)";
    const [response] = await pool.query(query, admin);
    return response;
}

export const GetAll = async () => {
    const query = "SELECT * FROM admins";
    const [admins] = await pool.query<RowDataPacket[]>(query);
    return admins;
}

export const Get = async (id:number) => {
    const query = "SELECT id, name, email, role FROM admins WHERE id = ?";
    const [admin] = await pool.query<RowDataPacket[]>(query, [id]);
    return admin;
}

export const Update = async (id:number, updateAdmin:Admin) => {
    const query = `UPDATE admins SET ${Object.keys(updateAdmin).join(", ")} WHERE id = ?`;
    const [result] = await pool.query(query, [...Object.values(updateAdmin), id]);
    return result;
}

export const Delete = async (id:number) => {
    const query = "DELETE FROM admins WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
} 