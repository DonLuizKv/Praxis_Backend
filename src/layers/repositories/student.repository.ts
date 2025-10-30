import pool from "../../utilities/Database";
import { Student } from "../../utilities/Types";
import { RowDataPacket } from "mysql2";

export const Create = async (student: Student) => {
    const query = `INSERT INTO students (name, email, identity_document, password, profile_photo) VALUES (?, ?, ?, ?, ?)`;
    const [response] = await pool.query(query, [student.name, student.email, student.identity_document, student.password, student.profile_photo]);
    return response;
};

export const GetAll = async () => {
    const query = `SELECT * FROM students`;
    const [result] = await pool.query<RowDataPacket[]>(query);
    return result;
}

export const Get = async (id: number) => {
    const query = `SELECT * FROM students WHERE id = ?`;
    const [result] = await pool.query<RowDataPacket[]>(query, [id]);
    return result;
}

export const Update = async (id: number, student: Student) => {
    const fields = Object.keys(student).map(key => `${key} = ?`).join(", ");
    const values = Object.values(student);

    const query = `UPDATE students SET ${fields} WHERE id = ?`;
    const [response] = await pool.query(query, [...values, id]);
    return response;
}

export const Delete = async (id: number) => {
    const query = `DELETE FROM students WHERE id = ?`;
    const [response] = await pool.query(query, [id]);
    return response;
}

// const uploadDocument = async (document) => {
//     try {
//         const query = `INSERT INTO documents SET ?`;
//         const [result] = await pool.query(query, [document]);
//         return result;
//     } catch (error) {
//         throw new Error('Error al subir el documento: ' + error.message);
//     }
// }

// const uploadBinnacle = async (binnacle) => {
//     try {
//         const query = `INSERT INTO binnacles SET ?`;
//         const [result] = await pool.query(query, [binnacle]);
//         return result;
//     } catch (error) {
//         throw new Error('Error al subir el binnacle: ' + error.message);
//     }
// }
