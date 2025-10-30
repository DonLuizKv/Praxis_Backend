import { Database } from "../../utilities/Database";

const connection = Database.getInstance()

export const verifyField = async (table: string, field: string, value: any) => {
    const query = `SELECT * FROM ${table} WHERE ${field} = $1`;
    const { rowCount } = await connection.query(query, [value]);
    return (rowCount ?? 0) > 0;
}

