import pool from "../../utilities/Database";
import { RowDataPacket } from "mysql2";
import { Student, User } from "../../utilities/Types";

export const GetAdmin = async (email: string) => {
    const query = "SELECT * FROM admins WHERE email = ?";
    const [admin] = await pool.query<RowDataPacket[]>(query, [email]);
    return admin;
}

export const GetStudent = async (email: string) => {
    const query = "SELECT * FROM students WHERE email = ?";
    const [student] = await pool.query<RowDataPacket[]>(query, [email]);
    return student;
}

export const GenerateStudent = async (student: Student) => {
    const query = "INSERT INTO students (name, email, password, identity_document, profile_photo) VALUES (?, ?, ?, ?, ?)";
    const [result] = await pool.query<RowDataPacket[]>(query, [
        student.name,
        student.email,
        student.password,
        student.identity_document,
        student.profile_photo
    ]);
    return result;
}

export const GenerateAdmin = async (admin: User) => {
    const query = "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query<RowDataPacket[]>(query, [admin.name, admin.email, admin.password, admin.role]);
    return result;
}

