import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const studentId = req.body.student_id;
        const tipo = req.body.tipo || 'documento';
        const ext = path.extname(file.originalname);

        const customName = `${studentId}-${tipo}${ext}`;
        cb(null, customName);
    },
});


// Filtro de tipo de archivo
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', "application/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        throw new Error('Tipo de archivo no permitido');
    }
};

// Límite de tamaño
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;
