import pool from "../utilities/database.js";

const createStudent = async (student) => {
    try {
        const [result] = await pool.query('INSERT INTO students SET ?', student);
        return result;
    } catch (error) {
        throw new Error('Error al crear el estudiante: ' + error.message);
    }
};

const getStudents = async () => {
    try {
        const query = `
            SELECT 
                s.id AS student_id,
                s.name AS student_name,
                s.email,
                s.document_id,
                d.id AS document_id,
                d.document_type,
                d.file_path,
                d.stateDocument,
                d.created_at AS document_created_at,
                d.updated_at AS document_updated_at
            FROM students s
            LEFT JOIN documents d ON s.id = d.student_id;
        `;
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error('Error al obtener los estudiantes: ' + error.message);
    }
}

const getStudentById = async (id) => {
    try {
        const query = `SELECT * FROM students WHERE id = ?`;
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error('Error al obtener el estudiante: ' + error.message);
    }
}

const getStudentByEmail = async (email) => {
    try {
        const query = `SELECT * FROM students WHERE email = ?`;
        const [result] = await pool.query(query, [email]);
        return result;
    } catch (error) {
        throw new Error('Error al obtener el estudiante: ' + error.message);
    }
}

const updateStudent = async (id, student) => {
    try {
        const query = `UPDATE students SET ? WHERE id = ?`;
        const [result] = await pool.query(query, [student, id]);
        return result;
    } catch (error) {
        throw new Error('Error al actualizar el estudiante: ' + error.message);
    }
}

const deleteStudent = async (id) => {
    try {
        const query = `DELETE FROM students WHERE id = ?`;
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error('Error al eliminar el estudiante: ' + error.message);
    }
}

const uploadDocument = async (document) => {
    try {
        const query = `INSERT INTO documents SET ?`;
        const [result] = await pool.query(query, [document]);
        return result;
    } catch (error) {
        throw new Error('Error al subir el documento: ' + error.message);
    }
}

const uploadBinnacle = async (binnacle) => {
    try {
        const query = `INSERT INTO binnacles SET ?`;
        const [result] = await pool.query(query, [binnacle]);
        return result;
    } catch (error) {
        throw new Error('Error al subir el binnacle: ' + error.message);
    }
}

export class StudentModel {
    static createStudent = createStudent;
    static getStudents = getStudents;
    static getStudentById = getStudentById;
    static getStudentByEmail = getStudentByEmail;
    static updateStudent = updateStudent;
    static deleteStudent = deleteStudent;
    static uploadDocument = uploadDocument;
    static uploadBinnacle = uploadBinnacle;
}