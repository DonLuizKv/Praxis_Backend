import { createConnection, createPool } from "mysql2";

export default pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "praxis",
});

