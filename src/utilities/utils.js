import pool from "../utilities/database.js";

export const normalizeStudent = async (student) => {
    const [documents] = await pool.query("SELECT * FROM documents WHERE student_id = ?", [student.id]);
    const [binnacles] = await pool.query("SELECT * FROM binnacles WHERE student_id = ?", [student.id]);

    const arl = documents.find((document) => document.document_type === "arl")
    const coverLetter = documents.find((document) => document.document_type === "coverLetter")

    return {
        id: student.id,
        name: student.name,
        document_id: student.document_id,
        scenary: student.scenary_name || "Sin escenario",
        state: Boolean(student.state),
        documents: { 
            arl: arl || { state: false, file_path: null },
            coverLetter: coverLetter || { state: false, file_path: null } 
        },
        binnacles
    }
}
