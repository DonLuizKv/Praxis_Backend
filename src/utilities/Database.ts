import dotenv from "dotenv";
import { Pool, QueryResult } from "pg";

dotenv.config();

export class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.validateEnvironmentVariables();

        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        // this.setupPoolEvents();
    }

    public static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    private validateEnvironmentVariables(): void {
        const required = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME", "DB_PORT"];
        const missing = required.filter((env) => !process.env[env]);

        if (missing.length > 0) {
            console.error(`Missing required environment variables: ${missing.join(", ")}`);
        }
    }

    // private setupPoolEvents(): void {
    //     this.pool.on("error", (err) => Logger.error(err));
    //     this.pool.on("connect", () => Logger.database("New client connected to pool"));
    // }

    async query(sql: string, params: any[] | any = []): Promise<QueryResult> {
        try {
            if (!sql || typeof sql !== "string") {
                console.error("SQL query is required and must be a string", {
                    styles: {
                        msg: { color: "red" }
                    }
                });
            }

            if (sql.includes("--") || /;\s*drop\s+/i.test(sql)) {
                console.error("Potentially dangerous SQL detected", {
                    styles: {
                        msg: { color: "red" }
                    }
                });
            }

            const { command, rowCount, oid, rows, fields } = await this.pool.query(sql, params)

            return {
                command,
                rowCount,
                oid,
                rows,
                fields,
            }

        } catch (error) {
            console.error(error as Error);
            throw error;
        }
    }

    // async transaction(queries: { sql: string; params?: any[] }[]): Promise<any[]> {
    //     const client = await this.pool.connect();
    //     try {
    //         await client.query("BEGIN");
    //         const results = [];

    //         for (const { sql, params = [] } of queries) {
    //             const result = await client.query(sql, params);
    //             results.push(result.rows);
    //         }

    //         await client.query("COMMIT");
    //         return results;
    //     } catch (error) {
    //         await client.query("ROLLBACK");
    //         Logger.error(error as Error);
    //         throw error;
    //     } finally {
    //         client.release();
    //     }
    // }

    async initialize(): Promise<void> {
        try {
            const client = await this.pool.connect();
            console.log(`Connected to the ${process.env.DB_NAME} database`);
            client.release();
        } catch (error) {
            console.error(error as Error);
            process.exit(1);
        }
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
            console.log("Database connections closed");
        } catch (error) {
            console.error(error as Error);
        }
    }

    getPoolStats() {
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount,
        };
    }
}
