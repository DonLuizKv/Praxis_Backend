import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"
import http from "http";
import { Server } from "socket.io";
import { SocketManager } from "./lib/SocketManager";
// Routes
import adminRoutes from "./layers/routes/admin.routes";
import scenaryRoutes from "./layers/routes/scenary.routes";
import studentRoutes from "./layers/routes/student.routes";
import filesRoutes from "./layers/routes/files.routes";
import authRoutes from "./layers/routes/auth.routes";
import path from "path";
import { Database } from "./utilities/Database";

dotenv.config();

// Environment Variables
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGINS
    }
});

// Socket
const socketManager = SocketManager.getInstance(io);
try {
    socketManager.start();
} catch (error) {
    console.log(error);
}

// // Rate Limit
// const limiter = rateLimit({
//     windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
//     max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
//     message: {
//         error: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente más tarde.'
//     }
// });

// CORS
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

const setDatabase = Database.getInstance();
setDatabase.initialize()

// Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes Use
app.use("/admin", adminRoutes);
app.use("/scenary", scenaryRoutes);
app.use("/student", studentRoutes);
app.use("/files", filesRoutes);
app.use("/auth", authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Welcome
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Praxis")
})

server.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})
