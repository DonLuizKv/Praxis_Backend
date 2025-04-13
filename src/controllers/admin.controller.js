import Model from "../models/admin.model.js";

//? Metodos que reciben y envian la informacion (mesero).
//* 200 - peticion correcta
//* 204 - peticion correcta pero no te envio nada
//todo 404 - url no encontrada
//! 500 - error en el servidor

async function create_Admin(req, res) {
    try {
        const { name, email, password } = req.body;
        await Model.createAdmin(name, email, password);
        return res.status(201).json({
            message: 'Admin creado con éxito',
        });
    } catch (e) {
        console.error('Error al crear admin:', e);
        return res.status(500).json({
            message: 'Error al crear admin',
            error: e,
        });
    }
}

async function listAdmins(req, res) {
    try {
        const consult = await getAllAdmins();
        return res.status(200).json({
            message: 'Admin creado con éxito',
            data:consult,
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error al crear admin',
            error: e,
        });
    }
}

export default {
    create_Admin,
    listAdmins,
}
