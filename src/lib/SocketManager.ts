import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import cron from "node-cron";
import { Server, Socket } from "socket.io";

dotenv.config();

interface Interval {
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    months: string;
    daysOfWeek: string;
}

export class SocketManager {
    static instance: SocketManager;
    static io: Server;
    static connectedUsers = new Map();
    static connectedAdmins = new Map();
    static connectedStudents = new Map();

    constructor(io: Server) {
        SocketManager.io = io;
    }

    static getInstance(io: Server) {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager(io);
        }
        return SocketManager.instance;
    }

    start() {
        try {
            console.log("\x1b[33m%s\x1b[0m", "SocketManager iniciado");
            SocketManager.io.on("connection", (socket) => {
                console.log("\x1b[32m%s\x1b[0m", "Nueva conexión de socket:", socket.id);
                if (!SocketManager.connectedUsers.has(socket.id)) {
                    SocketManager.connectedUsers.set(socket.id, socket);
                }

                socket.on("client_connected", (data) => {
                    const { token } = data;

                    if (!token) {
                        return;
                    }

                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
                    if (!decoded) {
                        return;
                    }

                    const { iat, exp, ...rest } = decoded;

                    const payload = {
                        socket,
                        ...rest
                    }

                    if (decoded.role === "admin") {
                        if (!SocketManager.connectedAdmins.has(socket.id)) {
                            SocketManager.connectedAdmins.set(socket.id, payload);
                        }
                    }

                    if (decoded.role === "student") {
                        if (!SocketManager.connectedStudents.has(socket.id)) {
                            SocketManager.connectedStudents.set(socket.id, payload);
                        }
                    }

                    console.log("\x1b[31m%s\x1b[0m", "Client decoded", rest);
                    this.logConnectionStatus();
                });

                socket.on("update_data", (data) => {
                    SocketManager.connectedUsers.forEach((user) => {
                        user.emit("update_data", data);
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
        } catch (error: any) {
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

    sendNotification(socket: Socket, data: any, interval: Interval) {
        const finalInterval = `${interval.seconds} ${interval.minutes} ${interval.hours} ${interval.days} ${interval.months} ${interval.daysOfWeek}`;
        cron.schedule(finalInterval, () => {
            socket.emit("binnacle_notification", data);
        });
    }
}
