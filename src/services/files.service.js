import pool from "../utilities/database.js";

export const getDocuments = async () => {
    try {
        const query = "SELECT * FROM documents";
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los documentos: " + error.message);
    }
}

export const getBinnacles = async () => {
    try {
        const query = "SELECT * FROM binnacles";
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener las bitácoras: " + error.message);
    }
}

export const uploadDocument = async (data) => {
    try {
        const { student_id, document_type, file_path } = data;

        if (!student_id || !document_type || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [student_id]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const query = "INSERT INTO documents (student_id, document_type, file_path) VALUES (?, ?, ?)";
        const [result] = await pool.query(query, [student_id, document_type, file_path]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const uploadBinnacle = async (data) => {
    try {
        const { student_id, name, date, file_path } = data;

        if (!student_id || !name || !date || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [student_id]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const query = "INSERT INTO binnacles (student_id, name, date, file_path) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(query, [student_id, name, date, file_path]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDocumentByStudentId = async (studentId) => {
    try {
        if (!studentId) {
            throw new Error("El ID del estudiante es requerido");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [studentId]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const query = "SELECT * FROM documents WHERE student_id = ?";
        const [result] = await pool.query(query, [studentId]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getBinnacleByStudentId = async (studentId) => {
    try {
        if (!studentId) {
            throw new Error("El ID del estudiante es requerido");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [studentId]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const query = "SELECT * FROM binnacles WHERE student_id = ?";
        const [result] = await pool.query(query, [studentId]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateDocument = async (id, data) => {
    try {
        const { document_type, file_path } = data;

        if (!id) {
            throw new Error("El ID del documento es requerido");
        }

        if (!document_type || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const [document] = await pool.query("SELECT * FROM documents WHERE id = ?", [id]);
        if (document.length === 0) {
            throw new Error("Documento no encontrado");
        }

        const query = "UPDATE documents SET document_type = ?, file_path = ? WHERE id = ?";
        const [result] = await pool.query(query, [document_type, file_path, id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateBinnacle = async (id, data) => {
    try {
        const { name, date, file_path } = data;

        if (!id) {
            throw new Error("El ID de la bitácora es requerido");
        }

        if (!name || !date || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const [binnacle] = await pool.query("SELECT * FROM binnacles WHERE id = ?", [id]);
        if (binnacle.length === 0) {
            throw new Error("Bitácora no encontrada");
        }

        const query = "UPDATE binnacles SET name = ?, date = ?, file_path = ? WHERE id = ?";
        const [result] = await pool.query(query, [name, date, file_path, id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteDocument = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del documento es requerido");
        }

        const [document] = await pool.query("SELECT * FROM documents WHERE id = ?", [id]);
        if (document.length === 0) {
            throw new Error("Documento no encontrado");
        }

        const query = "DELETE FROM documents WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteBinnacle = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID de la bitácora es requerido");
        }

        const [binnacle] = await pool.query("SELECT * FROM binnacles WHERE id = ?", [id]);
        if (binnacle.length === 0) {
            throw new Error("Bitácora no encontrada");
        }

        const query = "DELETE FROM binnacles WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
} 