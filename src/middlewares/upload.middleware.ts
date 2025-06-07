import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // crea carpetas si no existen
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
        cb(null, `${Date.now()}-${safeName}`);
    }

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
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

export default upload;
