import { normalizeStudent } from "../utilities/utils.js";
import { StudentModel } from "../models/student.model.js";

export const createStudent = async (data) => {
    try {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new Error("Todos los campos son requeridos");
        }

        const existingStudent = await StudentModel.getStudentByEmail(email);
        if (existingStudent.length > 0) {
            throw new Error("Ya existe un estudiante con este correo electrónico");
        }

        const payload = {
            name,
            email,
            password
        }
        
        const result = await StudentModel.createStudent(payload);
        return result;
    } catch (error) {
        throw new Error("Error al crear el estudiante: " + error.message);
    }
}

export const getStudents = async () => {
    try {
        const result = await StudentModel.getStudents();
        const students = [];

        await Promise.all(result.map(async (row) => {
            const student = await normalizeStudent(row);
            students.push(student)
        }))
        
        return students;
    } catch (error) {
        throw new Error("Error al obtener los estudiantes: " + error.message);
    }
}

export const getStudentById = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        const result = await StudentModel.getStudentById(id);

        if (result.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteStudent = async (id) => {
    try {
        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        const student = await StudentModel.getStudentById(id);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const result = await StudentModel.deleteStudent(id);

        if (result.affectedRows === 0) {
            throw new Error("Error al eliminar el estudiante");
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateStudent = async (id, data) => {
    try {
        if (!id) {
            throw new Error("El ID del estudiante es requerido");
        }

        if (!data) {
            throw new Error("Todos los campos son requeridos");
        }

        const student = await StudentModel.getStudentById(id);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        if (data.email) {
            const existingEmail = await StudentModel.getStudentByEmail(data.email);
            
            if (existingEmail.length > 0) {
                throw new Error("Ya existe otro estudiante con este correo electrónico");
            }
        }

        const payload = {
            ...data
        }

        const result = await StudentModel.updateStudent(id, payload);

        if (result.affectedRows === 0) {
            throw new Error("Error al actualizar el estudiante");
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const uploadDocument = async (data) => {
    try {
        const { student_id, document_type, file_path } = data;

        if (!student_id || !document_type || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const student = await StudentModel.getStudentById(student_id);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const payload = {
            student_id,
            document_type,
            file_path
        }

        const result = await StudentModel.uploadDocument(payload);

        if (result.affectedRows === 0) {
            throw new Error("Error al subir el documento");
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const uploadBinnacle = async (data) => {
    try {
        const { student_id, name, date, file_path } = data;

        if (!student_id || !name || !date || !file_path) {
            throw new Error("Todos los campos son requeridos");
        }

        const student = await StudentModel.getStudentById(student_id);
        if (student.length === 0) {
            throw new Error("Estudiante no encontrado");
        }

        const payload = {
            student_id,
            name,
            date,
            file_path
        }

        const result = await StudentModel.uploadBinnacle(payload);

        if (result.affectedRows === 0) {
            throw new Error("Error al subir el binnacle");
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createCurriculum = async (data) => {
    try {


        /**
         * {
"student": {
    "id": 1,
    "nombre": "Juan Pérez",
    "document_id": "123456789",
    "estado_civil": "Soltero",
    "residencia": "Bogotá",
    "telefono_residencia": "6011234567"
},
"formaciones": [
{ "tipo": "Primaria", "institucion": "Colegio ABC" },
{ "tipo": "Universitaria", "institucion": "Universidad XYZ" }
],
"experiencias": [
{ "nombre_empresa": "Empresa 1", "cargo": "Asistente", "direccion": "Calle 123", "telefono": "6011111111" }
],
"idiomas": [
{ "idioma": "Inglés", "lectura": 4, "escritura": 3, "habla": 5 }
],
"herramientas": [
{ "herramienta": "Word", "tipo": "Ofimática", "nivel": 5 },
{ "herramienta": "Photoshop", "tipo": "Otra", "nivel": 3 }
],
"referencias": [
{ "tipo": "Profesional", "nombre": "Carlos López", "telefono": "6012223333", "relacion": "Jefe anterior" }
]
}
         */

        const { student_id, estado_civil, residencia, telefono_residencia, formaciones, experiencias, idiomas, herramientas, referencias } = req.body;
        // // 1. Insertar en curriculums
        // const [curriculumResult] = await pool.query(`
        //     INSERT INTO curriculums (student_id, estado_civil, residencia, telefono_residencia)
        //     VALUES (?, ?, ?, ?)`,
        //     [student_id, estado_civil, residencia, telefono_residencia]
        // );

        // const curriculumId = curriculumResult.insertId;

        // // 2. Insertar formaciones
        // for (const formacion of formaciones) {
        //     await connection.query(`
        //       INSERT INTO formaciones (curriculum_id, tipo, institucion)
        //       VALUES (?, ?, ?)
        //     `, [curriculumId, formacion.tipo, formacion.institucion]);
        // }

        // // 3. Insertar experiencias laborales
        // for (const experiencia of experiencias) {
        //     await connection.query(`
        //       INSERT INTO experiencias_laborales (curriculum_id, nombre_empresa, cargo, direccion, telefono)
        //       VALUES (?, ?, ?, ?, ?)
        //     `, [curriculumId, experiencia.nombre_empresa, experiencia.cargo, experiencia.direccion, experiencia.telefono]);
        // }

        // // 4. Insertar idiomas
        // for (const idioma of idiomas) {
        //     await connection.query(`
        //       INSERT INTO idiomas (curriculum_id, idioma, lectura, escritura, habla)
        //       VALUES (?, ?, ?, ?, ?)
        //     `, [curriculumId, idioma.idioma, idioma.lectura, idioma.escritura, idioma.habla]);
        // }

        // // 5. Insertar herramientas informáticas
        // for (const herramienta of herramientas) {
        //     await connection.query(`
        //       INSERT INTO herramientas_informaticas (curriculum_id, herramienta, tipo, nivel)
        //       VALUES (?, ?, ?, ?)
        //     `, [curriculumId, herramienta.herramienta, herramienta.tipo, herramienta.nivel]);
        // }

        // // 6. Insertar referencias
        // for (const referencia of referencias) {
        //     await connection.query(`
        //       INSERT INTO referencias (curriculum_id, tipo, nombre, telefono, relacion)
        //       VALUES (?, ?, ?, ?, ?)
        //     `, [curriculumId, referencia.tipo, referencia.nombre, referencia.telefono, referencia.relacion]);
        // }

        // await connection.commit();
        res.status(200).json({ message: 'Currículum guardado exitosamente.' });

    } catch (error) {
        console.error(error);
        await connection.rollback();
        res.status(500).json({ message: 'Error al guardar el currículum.' });

    }
};

export const getAllCurriculums = async () => {
    try {

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCurriculumById = async (id) => {
    try {
        /**
         * 
    SELECT 
    s.id AS student_id,
    s.name AS nombre,
    s.document_id,
    c.id AS curriculum_id,
    c.estado_civil,
    c.residencia,
    c.telefono_residencia
FROM students s
INNER JOIN curriculums c ON s.id = c.student_id
WHERE s.id = ?;


    SELECT 
    f.id,
    f.tipo,
    f.institucion
    FROM formaciones f
    INNER JOIN curriculums c ON f.curriculum_id = c.id
    WHERE c.student_id = ?;

    SELECT 
    e.id,
    e.nombre_empresa,
    e.cargo,
    e.direccion,
    e.telefono
FROM experiencias_laborales e
INNER JOIN curriculums c ON e.curriculum_id = c.id
WHERE c.student_id = ?;

SELECT 
    i.id,
    i.idioma,
    i.lectura,
    i.escritura,
    i.habla
FROM idiomas i
INNER JOIN curriculums c ON i.curriculum_id = c.id
WHERE c.student_id = ?;

SELECT 
    h.id,
    h.herramienta,
    h.tipo,
    h.nivel
FROM herramientas_informaticas h
INNER JOIN curriculums c ON h.curriculum_id = c.id
WHERE c.student_id = ?;

SELECT 
    r.id,
    r.tipo,
    r.nombre,
    r.telefono,
    r.relacion
FROM referencias r
INNER JOIN curriculums c ON r.curriculum_id = c.id
WHERE c.student_id = ?;

{
"student": {
    "id": 1,
    "nombre": "Juan Pérez",
    "document_id": "123456789",
    "estado_civil": "Soltero",
    "residencia": "Bogotá",
    "telefono_residencia": "6011234567"
},
"formaciones": [
{ "tipo": "Primaria", "institucion": "Colegio ABC" },
{ "tipo": "Universitaria", "institucion": "Universidad XYZ" }
],
"experiencias": [
{ "nombre_empresa": "Empresa 1", "cargo": "Asistente", "direccion": "Calle 123", "telefono": "6011111111" }
],
"idiomas": [
{ "idioma": "Inglés", "lectura": 4, "escritura": 3, "habla": 5 }
],
"herramientas": [
{ "herramienta": "Word", "tipo": "Ofimática", "nivel": 5 },
{ "herramienta": "Photoshop", "tipo": "Otra", "nivel": 3 }
],
"referencias": [
{ "tipo": "Profesional", "nombre": "Carlos López", "telefono": "6012223333", "relacion": "Jefe anterior" }
]
}

         */
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateCurriculum = async (id, data) => {
    try {
        const { curriculum_id, estado_civil, residencia, telefono_residencia, formaciones, experiencias, idiomas, herramientas, referencias } = req.body;

        // 1. Actualizar currículum
        await connection.query(`
          UPDATE curriculums
          SET estado_civil = ?, residencia = ?, telefono_residencia = ?
          WHERE id = ?
        `, [estado_civil, residencia, telefono_residencia, curriculum_id]);

        // 2. Eliminar registros existentes (formaciones, experiencias, idiomas, etc.)
        await connection.query(`DELETE FROM formaciones WHERE curriculum_id = ?`, [curriculum_id]);
        await connection.query(`DELETE FROM experiencias_laborales WHERE curriculum_id = ?`, [curriculum_id]);
        await connection.query(`DELETE FROM idiomas WHERE curriculum_id = ?`, [curriculum_id]);
        await connection.query(`DELETE FROM herramientas_informaticas WHERE curriculum_id = ?`, [curriculum_id]);
        await connection.query(`DELETE FROM referencias WHERE curriculum_id = ?`, [curriculum_id]);

        // 3. Insertar nuevas formaciones
        for (const formacion of formaciones) {
            await connection.query(`
            INSERT INTO formaciones (curriculum_id, tipo, institucion)
            VALUES (?, ?, ?)
          `, [curriculum_id, formacion.tipo, formacion.institucion]);
        }

        // 4. Insertar nuevas experiencias laborales
        for (const experiencia of experiencias) {
            await connection.query(`
            INSERT INTO experiencias_laborales (curriculum_id, nombre_empresa, cargo, direccion, telefono)
            VALUES (?, ?, ?, ?, ?)
          `, [curriculum_id, experiencia.nombre_empresa, experiencia.cargo, experiencia.direccion, experiencia.telefono]);
        }

        // 5. Insertar nuevos idiomas
        for (const idioma of idiomas) {
            await connection.query(`
            INSERT INTO idiomas (curriculum_id, idioma, lectura, escritura, habla)
            VALUES (?, ?, ?, ?, ?)
          `, [curriculum_id, idioma.idioma, idioma.lectura, idioma.escritura, idioma.habla]);
        }

        // 6. Insertar nuevas herramientas informáticas
        for (const herramienta of herramientas) {
            await connection.query(`
            INSERT INTO herramientas_informaticas (curriculum_id, herramienta, tipo, nivel)
            VALUES (?, ?, ?, ?)
          `, [curriculum_id, herramienta.herramienta, herramienta.tipo, herramienta.nivel]);
        }

        // 7. Insertar nuevas referencias
        for (const referencia of referencias) {
            await connection.query(`
            INSERT INTO referencias (curriculum_id, tipo, nombre, telefono, relacion)
            VALUES (?, ?, ?, ?, ?)
          `, [curriculum_id, referencia.tipo, referencia.nombre, referencia.telefono, referencia.relacion]);
        }

        await connection.commit();
        res.status(200).json({ message: 'Currículum actualizado exitosamente.' });

    } catch (error) {
        console.error(error);
        await connection.rollback();
        res.status(500).json({ message: 'Error al actualizar el currículum.' });
    }
};