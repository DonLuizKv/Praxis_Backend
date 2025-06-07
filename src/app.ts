import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"
import rateLimit from 'express-rate-limit';
import http from "http";
import { Server } from "socket.io";
import { SocketManager } from "./lib/SocketManager";

dotenv.config();

// Environment Variables
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Routes
import adminRoutes from "./routes/admin.routes";
import scenaryRoutes from "./routes/scenary.routes";
import studentRoutes from "./routes/student.routes";
import filesRoutes from "./routes/files.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";

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

// Rate Limit
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    message: {
        error: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente más tarde.'
    }
});

// CORS
const corsOptions = {
    origin: function (origin: any, callback: any) {
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

// Middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);

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
