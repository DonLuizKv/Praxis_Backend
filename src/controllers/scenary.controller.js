import { createScenary, getScenarys } from "../services/admin.service.js";

export const CreateScenary = async (req, res) => {
    try {
        await createScenary(req.body);
        return res.status(201).json({ message: 'Escenario creado con éxito'});
    } catch (error) {
        console.error('Error al crear escenario:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const GetScenarys = async (req, res) => {
    try {
        const consult = await getScenarys();
        return res.status(200).json({ scenarys: consult });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
