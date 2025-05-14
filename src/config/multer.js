import multer from "multer";
import path from "path";

// Configuración de multer para manejar almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // El directorio donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); // Para evitar colisiones de nombres
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Genera el nombre del archivo
    },
});

// Filtro para asegurarse de que solo se acepten tipos específicos de archivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error("Tipo de archivo no permitido"), false); // Rechaza el archivo
    }
};

// Configuración de multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limitar tamaño máximo a 5MB
});

export default upload;
