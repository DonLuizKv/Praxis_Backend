import express from "express";
import { pool } from "./database.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


