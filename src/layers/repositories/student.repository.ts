import { Database } from "../../utilities/Database";
import { Student } from "../../utilities/Types";

const connection = Database.getInstance();

export const Create = async (student: Student) => {
    const query = `INSERT INTO students (name, email, identity_document, password, profile_photo) VALUES (?, ?, ?, ?, ?)`;
    await connection.query(query, [student.name, student.email, student.identity_document, student.password, student.profile_photo]);
};

export const GetAll = async () => {
    const query = `SELECT * FROM students`;
    const { rows } = await connection.query(query);
    return rows;
}

export const Get = async (id: number) => {
    const query = `SELECT * FROM students WHERE id = ?`;
    const { rows } = await connection.query(query, [id]);
    return rows[0];
}

export const Update = async (id: number, student: Student) => {
    const fields = Object.keys(student).map(key => `${key} = ?`).join(", ");
    const values = Object.values(student);

    const query = `UPDATE students SET ${fields} WHERE id = ?`;
    await connection.query(query, [...values, id]);
}

export const Delete = async (id: number) => {
    const query = `DELETE FROM students WHERE id = ?`;
    const { rowCount } = await connection.query(query, [id]);
    return (rowCount ?? 0) > 0;
}

// const uploadDocument = async (document) => {
//     try {
//         const query = `INSERT INTO documents SET ?`;
//         const [result] = await connection.query(query, [document]);
//         return result;
//     } catch (error) {
//         throw new Error('Error al subir el documento: ' + error.message);
//     }
// }

// const uploadBinnacle = async (binnacle) => {
//     try {
//         const query = `INSERT INTO binnacles SET ?`;
//         const [result] = await connection.query(query, [binnacle]);
//         return result;
//     } catch (error) {
//         throw new Error('Error al subir el binnacle: ' + error.message);
//     }
// }
