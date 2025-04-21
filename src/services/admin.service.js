import pool from "../utilities/database.js";

export const createAdmin = async (data) => {
    try {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new Error("Todos los campos son requeridos");
        }

        const [existingAdmin] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
        if (existingAdmin.length > 0) {
            throw new Error("Ya existe un administrador con este correo electrónico");
        }

        const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
        const [result] = await pool.query(query, [name, email, password]);
        return result;
    } catch (error) {
        throw new Error(error.message);
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
        if (!id) {
            throw new Error("El ID del administrador es requerido");
        }

        const query = "SELECT * FROM admins WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        
        if (result.length === 0) {
            throw new Error("Administrador no encontrado");
        }
        
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteAdmin = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del administrador es requerido");
        }

        const [admin] = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);
        if (admin.length === 0) {
            throw new Error("Administrador no encontrado");
        }

        const query = "DELETE FROM admins WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateAdmin = async (id, data) => {
    try {
        const { name, email, password } = data;

        if (!id) {
            throw new Error("El ID del administrador es requerido");
        }

        if (!name || !email || !password) {
            throw new Error("Todos los campos son requeridos");
        }

        const [admin] = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);
        if (admin.length === 0) {
            throw new Error("Administrador no encontrado");
        }

        const [existingEmail] = await pool.query("SELECT * FROM admins WHERE email = ? AND id != ?", [email, id]);
        if (existingEmail.length > 0) {
            throw new Error("Ya existe otro administrador con este correo electrónico");
        }

        const query = "UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ?";
        const [result] = await pool.query(query, [name, email, password, id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}