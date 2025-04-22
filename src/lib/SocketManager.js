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
            this.io.on("connection", (socket) => {
                console.log("Nueva conexión de socket:", socket.id);

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
                            role: decoded.role
                        };

                        SocketManager.connectedUsers.set(socket.id, userInfo);
                        
                        if (decoded.role === "admin") {
                            SocketManager.connectedAdmins.set(socket.id, userInfo);
                        } else if (decoded.role === "student") {
                            SocketManager.connectedStudents.set(socket.id, userInfo);
                        }

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

                socket.on("client_disconnected", (data) => {
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

                        this.removeUserFromMaps(socket.id, decoded.role);
                        this.logConnectionStatus();
                    } catch (error) {
                        console.error("Error en client_disconnected:", error.message);
                    }
                });

                socket.on("test", (data) => {
                    console.log("Test recibido:", data);
                    SocketManager.connectedUsers.forEach((user) => {
                        if (user.socket.id !== socket.id) {
                            user.socket.emit("test", data);
                        }
                    })
                })

                socket.on("disconnect", () => {
                    console.log("Socket desconectado:", socket.id);
                    const userInfo = SocketManager.connectedUsers.get(socket.id);
                    if (userInfo) {
                        this.removeUserFromMaps(socket.id, userInfo.role);
                    }
                    this.logConnectionStatus();
                });
            });
        } catch (error) {
            console.error("Error en SocketManager:", error.message);
        }
    }

    removeUserFromMaps(socketId, role) {
        SocketManager.connectedUsers.delete(socketId);
        if (role === "admin") {
            SocketManager.connectedAdmins.delete(socketId);
        } else if (role === "student") {
            SocketManager.connectedStudents.delete(socketId);
        }
    }

    logConnectionStatus() {
        console.log("Total de usuarios conectados:", SocketManager.connectedUsers.size);
    }
}
