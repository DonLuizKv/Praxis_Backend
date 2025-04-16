import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"

// routes
import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js"

// el servidor
const app = express();
dotenv.config();

// variables de entorno
const PORT = process.env.PORT;

// middelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// las ruticas
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Praxis")
})

// escuchamos el puerto 
app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})
