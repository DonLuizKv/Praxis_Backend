import { createStudent, getStudents, getStudentById, deleteStudent, updateStudent } from "../services/student.service.js";

export const CreateStudent = async (req, res) => {
    try {
        await createStudent(req.body);
        return res.status(201).json({ message: 'Estudiante creado con éxito'});
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const GetStudents = async (req, res) => {
    try {
        const consult = await getStudents();
        return res.status(200).json({ students: consult });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const GetStudentById = async (req, res) => {
    try {
        const consult = await getStudentById(req.params.id);
        return res.status(200).json({ student: consult });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const DeleteStudent = async (req, res) => {
    try {
        await deleteStudent(req.params.id);
        return res.status(200).json({ message: 'Estudiante eliminado con éxito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const UpdateStudent = async (req, res) => {
    try {
        await updateStudent(req.params.id, req.body);
        return res.status(200).json({ message: 'Estudiante actualizado con éxito'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


