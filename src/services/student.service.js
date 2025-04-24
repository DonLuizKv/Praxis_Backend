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
        throw new Error("Error al crear el estudiante: " + error.message);
    }
}

export const getStudents = async () => {
    try {
        const query = `
        SELECT 
            s.id AS student_id,
            s.name AS student_name,
            s.document_id,
            s.scenary,
            s.state AS stateStudent,

            d_arl.state AS arl_state,
            d_arl.file_path AS arl_file,

            d_cover.state AS cover_letter_state,
            d_cover.file_path AS cover_letter_file,

            b.id AS binnacle_id,
            b.name AS binnacle_name,
            b.date AS binnacle_date,
            b.file_path AS binnacle_file

        FROM students s
        LEFT JOIN documents d_arl ON d_arl.student_id = s.id AND d_arl.document_type = 'arl'
        LEFT JOIN documents d_cover ON d_cover.student_id = s.id AND d_cover.document_type = 'coverLetter'
        LEFT JOIN binnacles b ON b.student_id = s.id;
        `;
        const [result] = await pool.query(query);

        const students = [];

        result.forEach((row) => { 
            students.push({
                id: row.student_id,
                name: row.student_name,
                document_id: row.document_id,
                scenary: row.scenary,
                stateStudent: row.stateStudent === 1 ? true : false,
                documents:{
                    arl:{
                        state: row.arl_state === 1 ? true : false,
                        file_path: row.arl_file
                    },
                    coverLetter:{
                        state: row.cover_letter_state === 1 ? true : false,
                        file_path: row.cover_letter_file
                    },
                },
                binnacles: row.binnacle_id ? [
                    {
                        id: row.binnacle_id,
                        name: row.binnacle_name,
                        date: row.binnacle_date,
                        file_path: row.binnacle_file
                    }
                ] : []
            })
        })
        return students;
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