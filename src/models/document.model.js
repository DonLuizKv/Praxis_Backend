import pool from "../utilities/database.js";

export const createDocument = async (payload) => {
    try {
        const query = "INSERT INTO documents (student_id, document_type, state, file_path) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(query, payload);
        return result;
    } catch (error) {
        throw new Error("Error al crear el documento: " + error.message);
    }
}

export const getDocuments = async () => {
    try {
        const query = "SELECT * FROM documents";
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los documentos: " + error.message);
    }
}

export const getDocumentById = async (id) => {
    try {
        const query = "SELECT * FROM documents WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result[0];
    } catch (error) {
        throw new Error("Error al obtener el documento: " + error.message);
    }
}

export const getDocumentsByStudentId = async (studentId) => {
    try {
        const query = "SELECT * FROM documents WHERE student_id = ?";
        const [result] = await pool.query(query, [studentId]);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los documentos del estudiante: " + error.message);
    }
}

export const updateDocument = async (id, payload) => {
    try {
        const query = "UPDATE documents SET student_id = ?, document_type = ?, state = ?, file_path = ? WHERE id = ?";
        const [result] = await pool.query(query, [...payload, id]);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el documento: " + error.message);
    }
}

export const deleteDocument = async (id) => {
    try {
        const query = "DELETE FROM documents WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error("Error al eliminar el documento: " + error.message);
    }
} 