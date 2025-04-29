import pool from "../utilities/database.js";

export const createCurriculum = async (payload) => {
    try {
        const query = "INSERT INTO curriculums (student_id, civil_state, residence, residence_phone, tags, photo) VALUES (?, ?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, payload);
        return result;
    } catch (error) {
        throw new Error("Error al crear el currículum: " + error.message);
    }
}

export const getCurriculums = async () => {
    try {
        const query = `
            SELECT 
                s.id AS student_id,
                s.name AS student_name,
                s.document_id,
                s.state AS stateStudent,
                c.id AS curriculum_id,
                c.civil_state,
                c.residence,
                c.residence_phone,
                c.tags,
                c.photo
            FROM students s
            LEFT JOIN curriculums c ON c.student_id = s.id
        `;
        const [result] = await pool.query(query);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los currículums: " + error.message);
    }
}

export const getCurriculumById = async (id) => {
    try {
        const query = `
            SELECT 
                s.id AS student_id,
                s.name AS student_name,
                s.document_id,
                s.state AS stateStudent,
                c.id AS curriculum_id,
                c.civil_state,
                c.residence,
                c.residence_phone,
                c.tags,
                c.photo
            FROM students s
            LEFT JOIN curriculums c ON c.student_id = s.id
            WHERE s.id = ?
        `;
        const [result] = await pool.query(query, [id]);
        return result[0];
    } catch (error) {
        throw new Error("Error al obtener el currículum: " + error.message);
    }
}

export const updateCurriculum = async (id, payload) => {
    try {
        const query = "UPDATE curriculums SET student_id = ?, civil_state = ?, residence = ?, residence_phone = ?, tags = ?, photo = ? WHERE id = ?";
        const [result] = await pool.query(query, [...payload, id]);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el currículum: " + error.message);
    }
}

export const deleteCurriculum = async (id) => {
    try {
        const query = "DELETE FROM curriculums WHERE id = ?";
        const [result] = await pool.query(query, [id]);
        return result;
    } catch (error) {
        throw new Error("Error al eliminar el currículum: " + error.message);
    }
}

export const getCurriculumDetails = async (studentId) => {
    try {
        const query = `
            SELECT 
                s.id AS student_id,
                s.name AS student_name,
                s.document_id,
                c.id AS curriculum_id,
                c.civil_state,
                c.residence,
                c.residence_phone,
                c.tags,
                c.photo,
                f.id AS formation_id,
                f.type AS formation_type,
                f.institution,
                e.id AS experience_id,
                e.company_name,
                e.position,
                e.direction,
                e.phone,
                l.id AS language_id,
                l.idiom,
                l.read_level,
                l.writing_level,
                l.speak_level,
                ct.id AS tool_id,
                ct.tool,
                ct.type AS tool_type,
                ct.tool_level,
                sr.id AS reference_id,
                sr.type AS reference_type,
                sr.name AS reference_name,
                sr.phone AS reference_phone,
                sr.position AS reference_position
            FROM students s
            LEFT JOIN curriculums c ON c.student_id = s.id
            LEFT JOIN formations f ON f.curriculum_id = c.id
            LEFT JOIN work_experiences e ON e.curriculum_id = c.id
            LEFT JOIN languages l ON l.curriculum_id = c.id
            LEFT JOIN computer_tools ct ON ct.curriculum_id = c.id
            LEFT JOIN student_references sr ON sr.curriculum_id = c.id
            WHERE s.id = ?
        `;
        const [result] = await pool.query(query, [studentId]);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los detalles del currículum: " + error.message);
    }
} 