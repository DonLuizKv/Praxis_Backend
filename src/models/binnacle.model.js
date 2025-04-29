import pool from "../utilities/database.js";

export const createBinnacle = async (payload) => {
    try {
        const query = "INSERT INTO binnacles (student_id, name, date, file_path) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(query, payload);
        return result;
    } catch (error) {
        throw new Error("Error al crear la bitácora: " + error.message);
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

export const getBinnacleById = async (id) => {
    try {
        const query = "SELECT * FROM binnacles WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result[0];
    } catch (error) {
        throw new Error("Error al obtener la bitácora: " + error.message);
    }
}

export const getBinnaclesByStudentId = async (studentId) => {
    try {
        const query = "SELECT * FROM binnacles WHERE student_id = ?";
        const [result] = await pool.query(query, [studentId]);
        return result;
    } catch (error) {
        throw new Error("Error al obtener las bitácoras del estudiante: " + error.message);
    }
}

export const updateBinnacle = async (id, payload) => {
    try {
        const query = "UPDATE binnacles SET student_id = ?, name = ?, date = ?, file_path = ? WHERE id = ?";
        const [result] = await pool.query(query, [...payload, id]);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la bitácora: " + error.message);
    }
}

export const deleteBinnacle = async (id) => {
    try {
        const query = "DELETE FROM binnacles WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error("Error al eliminar la bitácora: " + error.message);
    }
} 