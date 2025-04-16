import Model from "../models/student.model.js";

//? Metodos que reciben y envian la informacion (mesero).
//* 200 - peticion correcta
//* 204 - peticion correcta pero no te envio nada
//todo 404 - url no encontrada
//! 500 - error en el servidor

async function create_Student(req, res) {
    try {
        const { name, email, password } = req.body;
        await Model.createStudent(name, email, password);
        return res.status(201).json({
            message: 'estudiante creado con éxito',
        });
    } catch (e) {
        console.error('Error al crear admin:', e);
        return res.status(500).json({
            message: 'Error al crear admin',
            error: e,
        });
    }
}

async function listStudents(req, res) {
    try {
        const consult = await Model.getAllStudents();
        return res.status(200).json(consult);
    } catch (e) {
        return res.status(500).json({
            message: 'Error al obtener los datos',
            error: e,
        });
    }
}

export default {
    create_Student,
    listStudents,
}
