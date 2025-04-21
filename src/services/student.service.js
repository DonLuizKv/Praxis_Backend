import pool from "../utilities/database.js";

export const createStudent = async (data) => {
    try {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new Error("Todos los campos son requeridos");
        }

        const [existingStudent] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
        if (existingStudent.length > 0) {
            throw new Error("Ya existe un estudiante con este correo electrónico");
        }

        const query = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";
        const [result] = await pool.query(query, [name, email, password]);
        return result;  
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getStudents = async () => {
    try {
        const query = "SELECT * FROM students";
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los estudiantes: " + error.message);
    }
}

export const getStudentById = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        const query = "SELECT * FROM students WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        
        if (result.length === 0) {
            throw new Error("Estudiante no encontrado");
        }
        
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteStudent = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const query = "DELETE FROM students WHERE id = ?";  
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateStudent = async (id, data) => {
    try {
        const { name, email, password } = data;

        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        if (!name || !email || !password) {
            throw new Error("Todos los campos son requeridos");
        }

        const [student] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const [existingEmail] = await pool.query("SELECT * FROM students WHERE email = ? AND id != ?", [email, id]);
        if (existingEmail.length > 0) {
            throw new Error("Ya existe otro estudiante con este correo electrónico");
        }

        const query = "UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?";
        const [result] = await pool.query(query, [name, email, password, id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
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