import { RowDataPacket } from "mysql2";
import pool from "../../utilities/Database";
import { Binnacle, Document } from "../../utilities/Types";

export const CreateDocument = async (document: Document) => {    
    const query = "INSERT INTO documents (name, student_id, document_type, file_path) VALUES (?, ?, ?, ?)";
    const [response] = await pool.query(query, [document.name, document.student_id, document.document_type, document.file_path]);
    return response;
}

export const GetAllDocuments = async () => {
    const query = "SELECT * FROM documents";
    const [result] = await pool.query<RowDataPacket[]>(query);
    return result;
}

export const GetDocument = async (id: number) => {
    const query = "SELECT * FROM documents WHERE id = ?";
    const [result] = await pool.query<RowDataPacket[]>(query, [id]);
    return result;
}

export const UpdateDocument = async (id: number, document: Document) => {
    const fields = Object.keys(document).map(key => `${key} = ?`).join(", ");
    const values = Object.values(document);

    const query = `UPDATE documents SET ${fields} WHERE id = ?`;
    const [response] = await pool.query(query, [...values, id]);
    return response;
}

export const DeleteDocument = async (id: number) => {
    const query = "DELETE FROM documents WHERE id = ?";
    const [response] = await pool.query(query, [id]);
    return response;
} 

//$ Binnacles
export const CreateBinnacle = async (binnacle: Binnacle) => {
    const query = "INSERT INTO binnacles (name, student_id, file_path) VALUES (?, ?, ?)";
    const [response] = await pool.query(query, [binnacle.name, binnacle.student_id, binnacle.file_path]);
    return response;
}

export const GetAllBinnacles = async () => {
    const query = "SELECT * FROM binnacles";
    const [result] = await pool.query<RowDataPacket[]>(query);
    return result;
}   

export const GetBinnacle = async (id: number) => {
    const query = "SELECT * FROM binnacles WHERE id = ?";
    const [result] = await pool.query<RowDataPacket[]>(query, [id]);
    return result;
}   

export const UpdateBinnacle = async (id: number, binnacle: Binnacle) => {
    const fields = Object.keys(binnacle).map(key => `${key} = ?`).join(", ");
    const values = Object.values(binnacle);

    const query = `UPDATE binnacles SET ${fields} WHERE id = ?`;
    const [response] = await pool.query(query, [...values, id]);
    return response;
}       

export const DeleteBinnacle = async (id: number) => {
    const query = "DELETE FROM binnacles WHERE id = ?";
    const [response] = await pool.query(query, [id]);
    return response;
}
