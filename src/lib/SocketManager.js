import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class SocketManager {
    static instance;
    static io;
    static connectedUsers = new Map();
    static connectedAdmins = new Map();
    static connectedStudents = new Map();

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
            console.log("\x1b[33m%s\x1b[0m", "SocketManager iniciado");
            this.io.on("connection", (socket) => {
                console.log("\x1b[32m%s\x1b[0m", "Nueva conexión de socket:", socket.id);
                if(!SocketManager.connectedUsers.has(socket.id)) {
                    SocketManager.connectedUsers.set(socket.id, socket);
                }

                socket.on("client_connected", (data) => {
                    const { token } = data;

                    if(!token) {
                        return;
                    }
                    
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    if(!decoded) {
                        return;
                    }

                    const { iat, exp, ...rest } = decoded;

                    const payload = {
                        socket,
                        ...rest
                    }

                    if(decoded.role === "admin") {
                        if(!SocketManager.connectedAdmins.has(socket.id)) {
                            SocketManager.connectedAdmins.set(socket.id, payload);
                        }
                    }

                    if(decoded.role === "student") {
                        if(!SocketManager.connectedStudents.has(socket.id)) {
                            SocketManager.connectedStudents.set(socket.id, payload);
                        }
                    }

                    console.log("\x1b[31m%s\x1b[0m", "Client decoded", rest);
                    this.logConnectionStatus();
                });

                socket.on("UPDATE_DATA", (data) => {
                    console.log("UPDATE_DATA", data);
                    SocketManager.connectedUsers.forEach((user) => {
                        user.emit("UPDATE_DATA", data);
                    });
                });

                socket.on("disconnect", () => {
                    console.log("\x1b[31m%s\x1b[0m", "Socket desconectado:", socket.id);
                    SocketManager.connectedUsers.delete(socket.id);
                    SocketManager.connectedAdmins.delete(socket.id);
                    SocketManager.connectedStudents.delete(socket.id);
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
        console.log("\x1b[33m%s\x1b[0m", "Total de administradores conectados:", SocketManager.connectedAdmins.size);
        console.log("\x1b[33m%s\x1b[0m", "Total de estudiantes conectados:", SocketManager.connectedStudents.size);

        const PlayersRegistered = [...SocketManager.connectedAdmins.values(), ...SocketManager.connectedStudents.values()].map((player) => {
            const { socket, ...rest } = player;
            return {
                socketId: socket.id,
                ...rest
            };
        });

        console.log("\x1b[33m%s\x1b[0m", "Usuarios conectados:", PlayersRegistered);
    }
}
