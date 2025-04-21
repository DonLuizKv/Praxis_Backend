import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } from "../services/admin.service.js";

export const CreateAdmin = async (req, res) => {
    try {
        await createAdmin(req.body);
        return res.status(201).json({ message: 'Admin creado con éxito'});
    } catch (error) {
        console.error('Error al crear admin:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const GetAdmins = async (req, res) => {
    try {
        const consult = await getAdmins();
        return res.status(200).json({ admins: consult });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const GetAdminById = async (req, res) => {
    try {
        const consult = await getAdminById(req.params.id);
        return res.status(200).json({ admin: consult });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const UpdateAdmin = async (req, res) => {
    try {
        await updateAdmin(req.params.id, req.body);
        return res.status(200).json({ message: 'Admin actualizado con éxito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};  

export const DeleteAdmin = async (req, res) => {
    try {
        await deleteAdmin(req.params.id);
        return res.status(200).json({ message: 'Admin eliminado con éxito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

