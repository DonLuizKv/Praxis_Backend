import { Database } from "../../utilities/Database";

export abstract class Repository<T extends object> {

    constructor(
        protected readonly table: string,
         readonly database = Database.getInstance()
    ) { }

    async Find(id: number | string): Promise<T | null> {
        const { rowCount, rows } = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = $1 LIMIT 1`,
            [id]
        );
        return rowCount ? (rows[0] as T) : null;
    }

    async FindAll(): Promise<T[]> {
        const { rows } = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return rows as T[];
    }

    async Insert(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`;

        await this.database.query(query, values);
    }

    async Update(id: number | string, data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const setClause = keys.map((_, i) => `$${i + 1}`).join(", ");
        const query = `UPDATE ${this.table} SET ${setClause} WHERE id = $1`;

        await this.database.query(query, [...values, id]);
    }

    async Delete(id: number | string): Promise<boolean> {
        const { rowCount } = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = $1`,
            [id]
        );

        return (rowCount ?? 0) > 0;
    }
}
