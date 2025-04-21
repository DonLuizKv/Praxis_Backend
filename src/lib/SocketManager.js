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
        try{
            this.io.on("connection", (socket) => {
                console.log("Un usuario se ha conectado");
                if (!SocketManager.connectedUsers.has(socket.id)) {
                    SocketManager.connectedUsers.set(socket.id, socket);
                }
                console.log("Usuarios conectados: ", SocketManager.connectedUsers.size);
    
                socket.on("client_connected", (data) => {
                    try {
                        if (!data.role || !data.token) {
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

                        if (decoded.role === "admin") {
                            console.log("Admin conectado");
                            SocketManager.connectedAdmins.set(socket.id, socket);
                        }

                        if (decoded.role === "student") {
                            console.log("Estudiante conectado");
                            SocketManager.connectedStudents.set(socket.id, socket);
                        }

                        const payload = {
                            role: decoded.role,
                            id: decoded.id,
                            email: decoded.email
                        }

                        socket.emit("client_connected", payload);
                    } catch (error) {
                        console.error("Error al verificar token:", error.message);
                    }
                })
    
                socket.on("disconnect", () => {
                    console.log("Un usuario se ha desconectado");
                    SocketManager.connectedUsers.delete(socket.id);
                });
            });
        } catch (error) {
            console.error("Error en SocketManager:", error.message);
        }
    }
}
