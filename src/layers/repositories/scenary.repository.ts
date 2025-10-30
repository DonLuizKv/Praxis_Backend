import pool from "../../utilities/Database";
import { Scenary } from "../../utilities/Types";
import { RowDataPacket } from "mysql2";

export const Create = async (scenary: Scenary) => {
    const query = "INSERT INTO scenary (name, address) VALUES (?, ?)";
    const [result] = await pool.query(query, [scenary.name, scenary.address]);
    return result;
}

export const GetAll = async () => {
    const query = "SELECT * FROM scenary";
    const [result] = await pool.query<RowDataPacket[]>(query);
    return result;
}

export const Get = async (id: number) => {
    const query = "SELECT * FROM scenary WHERE id = ?";
    const [result] = await pool.query<RowDataPacket[]>(query, [id]);
    return result;
}

export const Update = async (id: number, updateScenary: Scenary) => {
    const fields = Object.keys(updateScenary).map(key => `${key} = ?`).join(", ");
    const values = Object.values(updateScenary);

    const query = `UPDATE scenary SET ${fields} WHERE id = ?`;
    const [result] = await pool.query(query, [...values, id]);
    return result;
}

export const Delete = async (id: number) => {
    const query = "DELETE FROM scenary WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
}





