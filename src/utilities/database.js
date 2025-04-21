import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections: true,
});

pool.getConnection().then((connection) => {
    console.log("Conectado a la base de datos");
    connection.release();
}).catch((error) => {
    console.log("Error al conectar con la base de datos", error);
});

export default pool;