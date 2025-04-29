import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class SocketManager {
    static instance;
    static io;
    static connectedUsers = new Map();

    constructor(io) {
        this.io = io;
    }

    static getInstance(io) {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager(io);
        }
        return SocketManager.instance;
    }

    start() {
        try {
            this.io.on("connection", (socket) => {
                console.log("\x1b[32m%s\x1b[0m", "Nueva conexión de socket:", socket.id);
                if(!SocketManager.connectedUsers.has(socket.id)) {
                    SocketManager.connectedUsers.set(socket.id, socket);
                }

                socket.on("client_connected", (data) => {
                    try {
                        if (!data.token) {
                            console.error("Datos incompletos para autenticación");
                            return;
                        }

                        const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
                        if (!decoded) {
                            console.error("Token inválido");
                            return;
                        }

                        if (!["admin", "student"].includes(decoded.role)) {
                            console.error("Rol inválido");
                            return;
                        }

                        // Almacenar información del usuario
                        const userInfo = {
                            socket,
                            userId: decoded.id,
                            role: decoded.role,
                            name: decoded.name,
                            email: decoded.email
                        };

                        const payload = {
                            role: decoded.role,
                            id: decoded.id,
                            name: decoded.name,
                            email: decoded.email
                        };

                        socket.emit("client_connected", payload);
                        this.logConnectionStatus();
                    } catch (error) {
                        console.error("Error al verificar token:", error.message);
                    }
                });

                socket.on("UPDATE_DATA", (data) => {
                    console.log("UPDATE_DATA", data);
                    SocketManager.connectedUsers.forEach((user) => {
                        user.emit("UPDATE_DATA", data);
                    });
                });

                socket.on("client_disconne  cted", (data) => {
                    try {
                        if (!data || !data.token) {
                            console.error("Error: Datos de desconexión incompletos");
                            return;
                        }

                        const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
                        if (!decoded) {
                            console.error("Token inválido");
                            return;
                        }

                        SocketManager.connectedUsers.delete(socket.id);
                        this.logConnectionStatus();
                    } catch (error) {
                        console.error("Error en client_disconnected:", error.message);
                    }
                });

                socket.on("disconnect", () => {
                    console.log("\x1b[31m%s\x1b[0m", "Socket desconectado:", socket.id);
                    SocketManager.connectedUsers.delete(socket.id);
                    this.logConnectionStatus();
                });

                this.logConnectionStatus();
            });
        } catch (error) {
            console.error("Error en SocketManager:", error.message);
        }
    }

    logConnectionStatus() {
        console.log("\x1b[33m%s\x1b[0m", "Total de usuarios conectados:", SocketManager.connectedUsers.size);
        console.log("\x1b[33m%s\x1b[0m", "Usuarios conectados:", Array.from(SocketManager.connectedUsers.entries()).map(([id, user]) => ({
            socketId: id,
        })));
    }
}
