import {
    uploadDocument, uploadBinnacle, getDocuments, getBinnacles, getDocumentByStudentId, getBinnacleByStudentId, updateDocument, updateBinnacle, deleteDocument, deleteBinnacle
} from "../services/files.service.js";

export const GetDocuments = async (req, res) => {
    try {
        const documents = await getDocuments();
        return res.status(200).json({ documents });
    } catch (error) {
        console.error('Error al obtener documentos:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const GetBinnacles = async (req, res) => {
    try {
        const binnacles = await getBinnacles();
        return res.status(200).json({ binnacles });
    } catch (error) {
        console.error('Error al obtener bitácoras:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const UploadDocument = async (req, res) => {
    try {
        await uploadDocument(req.body, req.file);
        return res.status(201).json({ message: 'Documento subido con éxito' });
    } catch (error) {
        console.error('Error al subir documento:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const UploadBinnacle = async (req, res) => {
    try {
        await uploadBinnacle(req.body);
        return res.status(201).json({ message: 'Bitácora subida con éxito' });
    } catch (error) {
        console.error('Error al subir bitácora:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const GetDocumentByStudentId = async (req, res) => {
    try {
        const documents = await getDocumentByStudentId(req.params.id);
        return res.status(200).json({ document: documents[0] });
    } catch (error) {
        console.error('Error al obtener documentos del estudiante:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const GetBinnacleByStudentId = async (req, res) => {
    try {
        const binnacles = await getBinnacleByStudentId(req.params.id);
        return res.status(200).json({ binnacle: binnacles[0] });
    } catch (error) {
        console.error('Error al obtener bitácoras del estudiante:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const UpdateDocument = async (req, res) => {
    try {
        await updateDocument(req.params.id, req.body);
        return res.status(200).json({ message: 'Documento actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar documento:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const UpdateBinnacle = async (req, res) => {
    try {
        await updateBinnacle(req.params.id, req.body);
        return res.status(200).json({ message: 'Bitácora actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar bitácora:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const DeleteDocument = async (req, res) => {
    try {
        await deleteDocument(req.params.id);
        return res.status(200).json({ message: 'Documento eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar documento:', error);
        return res.status(400).json({ error: error.message });
    }
};

export const DeleteBinnacle = async (req, res) => {
    try {
        await deleteBinnacle(req.params.id);
        return res.status(200).json({ message: 'Bitácora eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar bitácora:', error);
        return res.status(400).json({ error: error.message });
    }
}; 