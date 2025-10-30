import pool from "../../utilities/Database";
import { RowDataPacket } from "mysql2";

export const verifyField = async (table: string, field: string, value: any) => {
    const query = `SELECT * FROM ${table} WHERE ${field} = ?`;
    const [result] = await pool.query<RowDataPacket[]>(query, [value]);
    return result.length > 0;
}

