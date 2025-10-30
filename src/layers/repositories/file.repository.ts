import { Database } from "../../utilities/Database";
import { Binnacle, Document } from "../../utilities/Types";

const connection = Database.getInstance();

export const CreateDocument = async (document: Document) => {
    const query = "INSERT INTO documents (name, student_id, document_type, file_path) VALUES (?, ?, ?, ?)";
    await connection.query(query, [document.name, document.student_id, document.document_type, document.file_path]);
}

export const GetAllDocuments = async () => {
    const query = "SELECT * FROM documents";
    const { rows } = await connection.query(query);
    return rows[0];
}

export const GetDocument = async (id: number) => {
    const query = "SELECT * FROM documents WHERE id = ?";
    const { rows } = await connection.query(query, [id]);
    return rows[0];
}

export const UpdateDocument = async (id: number, document: Document) => {
    const fields = Object.keys(document).map(key => `${key} = ?`).join(", ");
    const values = Object.values(document);

    const query = `UPDATE documents SET ${fields} WHERE id = ?`;
    await connection.query(query, [...values, id]);
}

export const DeleteDocument = async (id: number) => {
    const query = "DELETE FROM documents WHERE id = ?";
    const { rowCount } = await connection.query(query, [id]);
    return (rowCount ?? 0) > 0;
}

//$ Binnacles
export const CreateBinnacle = async (binnacle: Binnacle) => {
    const query = "INSERT INTO binnacles (name, student_id, file_path) VALUES (?, ?, ?)";
    await connection.query(query, [binnacle.name, binnacle.student_id, binnacle.file_path]);
}

export const GetAllBinnacles = async () => {
    const query = "SELECT * FROM binnacles";
    const { rows } = await connection.query(query);
    return rows[0];
}

export const GetBinnacle = async (id: number) => {
    const query = "SELECT * FROM binnacles WHERE id = ?";
    const { rows } = await connection.query(query, [id]);
    return rows[0];
}

export const UpdateBinnacle = async (id: number, binnacle: Binnacle) => {
    const fields = Object.keys(binnacle).map(key => `${key} = ?`).join(", ");
    const values = Object.values(binnacle);

    const query = `UPDATE binnacles SET ${fields} WHERE id = ?`;
    await connection.query(query, [...values, id]);
}

export const DeleteBinnacle = async (id: number) => {
    const query = "DELETE FROM binnacles WHERE id = ?";
    const { rowCount } = await connection.query(query, [id]);
    return (rowCount ?? 0) > 0;
}
