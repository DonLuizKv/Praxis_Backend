import pool from "../utilities/database.js";

export const createAdmin = async (payload) => {
    try {
        const query = "INSERT INTO admins (name, email, role, password) VALUES (?, ?, ?, ?)";
        const [result] = await pool.query(query, payload);
        return result;
    } catch (error) {
        throw new Error("Error al crear el administrador: " + error.message);
    }
}

export const getAdmins = async () => {
    try {
        const query = "SELECT * FROM admins";
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los administradores: " + error.message);
    }
}

export const getAdminById = async (id) => {
    try {
        const query = "SELECT * FROM admins WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result[0];
    } catch (error) {
        throw new Error("Error al obtener el administrador: " + error.message);
    }
}

export const updateAdmin = async (id, payload) => {
    try {
        const query = "UPDATE admins SET name = ?, email = ?, role = ?, password = ? WHERE id = ?";
        const [result] = await pool.query(query, [...payload, id]);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el administrador: " + error.message);
    }
}

export const deleteAdmin = async (id) => {
    try {
        const query = "DELETE FROM admins WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error("Error al eliminar el administrador: " + error.message);
    }
} 