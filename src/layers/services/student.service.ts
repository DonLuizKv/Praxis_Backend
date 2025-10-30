import { Student } from "../../utilities/Types";
import { verifyField } from "../repositories/generic.model";
import { Create, Delete, Get, GetAll, Update } from "../repositories/student.repository";
import { hashPassword, normalizeStudent } from "../../utilities/utils";

export const createStudent = async (student: Student) => {
    const errors = {
        name: "name is already exists",
        email: "email is already exists",
        identity_document: "identity document is already exists",
    }

    for (const field of Object.keys(errors)) {
        const values = student[field as keyof Student];
        const existInDB = await verifyField("students", field, values);
        if (existInDB) {
            throw new Error(errors[field as keyof typeof errors]);
        }
    }

    const password = await hashPassword(student.password);

    const newStudent = {
        ...student,
        password,
        profile_photo: student.profile_photo || ""
    }

    const response = await Create(newStudent);
    return response;
}

export const getStudent = async (id: number) => {
    const errors = {
        notFound: "Student not found"
    }

    const student = await Get(id);

    if (student.length === 0) {
        throw new Error(errors.notFound);
    }

    const normalizedStudent = await normalizeStudent(student[0] as Student);
    return normalizedStudent;
}

export const getStudents = async () => {
    const errors = {
        notFound: "Student not found"
    }

    const students = await GetAll();

    if (students.length === 0) {
        throw new Error(errors.notFound);
    }

    const normalizedStudents = await Promise.all(
        students.map((student) =>
            normalizeStudent(student as Student)
        )
    );

    return normalizedStudents;
}

export const deleteStudent = async (id: number) => {
    const errors = {
        notFound: "Student not found"
    }

    const FindStudent = await verifyField("students", "id", id);

    if (!FindStudent) {
        throw new Error(errors.notFound);
    }

    const student = await Delete(id);
    return student;
}

export const updateStudent = async (id: number, updatedStudent: Student) => {
    const errors = {
        notFound: "Student not found"
    }

    const FindStudent = await verifyField("students", "id", id);

    if (!FindStudent) {
        throw new Error(errors.notFound);
    }

    const student = await Update(id, updatedStudent);
    return student;
}

// export const uploadDocument = async (data) => {
//     try {
//         const { student_id, document_type, file_path } = data;

//         if (!student_id || !document_type || !file_path) {
//             throw new Error("Todos los campos son requeridos");
//         }

//         const student = await StudentModel.getStudentById(student_id);
//         if (student.length === 0) {
//             throw new Error("Estudiante no encontrado");
//         }

//         const payload = {
//             student_id,
//             document_type,
//             file_path
//         }

//         const result = await StudentModel.uploadDocument(payload);

//         if (result.affectedRows === 0) {
//             throw new Error("Error al subir el documento");
//         }

//         return result;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const uploadBinnacle = async (data) => {
//     try {
//         const { student_id, name, date, file_path } = data;

//         if (!student_id || !name || !date || !file_path) {
//             throw new Error("Todos los campos son requeridos");
//         }

//         const student = await StudentModel.getStudentById(student_id);
//         if (student.length === 0) {
//             throw new Error("Estudiante no encontrado");
//         }

//         const payload = {
//             student_id,
//             name,
//             date,
//             file_path
//         }

//         const result = await StudentModel.uploadBinnacle(payload);

//         if (result.affectedRows === 0) {
//             throw new Error("Error al subir el binnacle");
//         }

//         return result;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const createCurriculum = async (data) => {
//     try {


//         /**
//          * {
// "student": {
//     "id": 1,
//     "nombre": "Juan Pérez",
//     "document_id": "123456789",
//     "estado_civil": "Soltero",
//     "residencia": "Bogotá",
//     "telefono_residencia": "6011234567"
// },
// "formaciones": [
// { "tipo": "Primaria", "institucion": "Colegio ABC" },
// { "tipo": "Universitaria", "institucion": "Universidad XYZ" }
// ],
// "experiencias": [
// { "nombre_empresa": "Empresa 1", "cargo": "Asistente", "direccion": "Calle 123", "telefono": "6011111111" }
// ],
// "idiomas": [
// { "idioma": "Inglés", "lectura": 4, "escritura": 3, "habla": 5 }
// ],
// "herramientas": [
// { "herramienta": "Word", "tipo": "Ofimática", "nivel": 5 },
// { "herramienta": "Photoshop", "tipo": "Otra", "nivel": 3 }
// ],
// "referencias": [
// { "tipo": "Profesional", "nombre": "Carlos López", "telefono": "6012223333", "relacion": "Jefe anterior" }
// ]
// }
//          */

//         const { student_id, estado_civil, residencia, telefono_residencia, formaciones, experiencias, idiomas, herramientas, referencias } = req.body;
//         // // 1. Insertar en curriculums
//         // const [curriculumResult] = await pool.query(`
//         //     INSERT INTO curriculums (student_id, estado_civil, residencia, telefono_residencia)
//         //     VALUES (?, ?, ?, ?)`,
//         //     [student_id, estado_civil, residencia, telefono_residencia]
//         // );

//         // const curriculumId = curriculumResult.insertId;

//         // // 2. Insertar formaciones
//         // for (const formacion of formaciones) {
//         //     await connection.query(`
//         //       INSERT INTO formaciones (curriculum_id, tipo, institucion)
//         //       VALUES (?, ?, ?)
//         //     `, [curriculumId, formacion.tipo, formacion.institucion]);
//         // }

//         // // 3. Insertar experiencias laborales
//         // for (const experiencia of experiencias) {
//         //     await connection.query(`
//         //       INSERT INTO experiencias_laborales (curriculum_id, nombre_empresa, cargo, direccion, telefono)
//         //       VALUES (?, ?, ?, ?, ?)
//         //     `, [curriculumId, experiencia.nombre_empresa, experiencia.cargo, experiencia.direccion, experiencia.telefono]);
//         // }

//         // // 4. Insertar idiomas
//         // for (const idioma of idiomas) {
//         //     await connection.query(`
//         //       INSERT INTO idiomas (curriculum_id, idioma, lectura, escritura, habla)
//         //       VALUES (?, ?, ?, ?, ?)
//         //     `, [curriculumId, idioma.idioma, idioma.lectura, idioma.escritura, idioma.habla]);
//         // }

//         // // 5. Insertar herramientas informáticas
//         // for (const herramienta of herramientas) {
//         //     await connection.query(`
//         //       INSERT INTO herramientas_informaticas (curriculum_id, herramienta, tipo, nivel)
//         //       VALUES (?, ?, ?, ?)
//         //     `, [curriculumId, herramienta.herramienta, herramienta.tipo, herramienta.nivel]);
//         // }

//         // // 6. Insertar referencias
//         // for (const referencia of referencias) {
//         //     await connection.query(`
//         //       INSERT INTO referencias (curriculum_id, tipo, nombre, telefono, relacion)
//         //       VALUES (?, ?, ?, ?, ?)
//         //     `, [curriculumId, referencia.tipo, referencia.nombre, referencia.telefono, referencia.relacion]);
//         // }

//         // await connection.commit();
//         res.status(200).json({ message: 'Currículum guardado exitosamente.' });

//     } catch (error) {
//         console.error(error);
//         await connection.rollback();
//         res.status(500).json({ message: 'Error al guardar el currículum.' });

//     }
// };

// export const getAllCurriculums = async () => {
//     try {

//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const getCurriculumById = async (id) => {
//     try {
//         /**
//          *
//     SELECT
//     s.id AS student_id,
//     s.name AS nombre,
//     s.document_id,
//     c.id AS curriculum_id,
//     c.estado_civil,
//     c.residencia,
//     c.telefono_residencia
// FROM students s
// INNER JOIN curriculums c ON s.id = c.student_id
// WHERE s.id = ?;


//     SELECT
//     f.id,
//     f.tipo,
//     f.institucion
//     FROM formaciones f
//     INNER JOIN curriculums c ON f.curriculum_id = c.id
//     WHERE c.student_id = ?;

//     SELECT
//     e.id,
//     e.nombre_empresa,
//     e.cargo,
//     e.direccion,
//     e.telefono
// FROM experiencias_laborales e
// INNER JOIN curriculums c ON e.curriculum_id = c.id
// WHERE c.student_id = ?;

// SELECT
//     i.id,
//     i.idioma,
//     i.lectura,
//     i.escritura,
//     i.habla
// FROM idiomas i
// INNER JOIN curriculums c ON i.curriculum_id = c.id
// WHERE c.student_id = ?;

// SELECT
//     h.id,
//     h.herramienta,
//     h.tipo,
//     h.nivel
// FROM herramientas_informaticas h
// INNER JOIN curriculums c ON h.curriculum_id = c.id
// WHERE c.student_id = ?;

// SELECT
//     r.id,
//     r.tipo,
//     r.nombre,
//     r.telefono,
//     r.relacion
// FROM referencias r
// INNER JOIN curriculums c ON r.curriculum_id = c.id
// WHERE c.student_id = ?;

// {
// "student": {
//     "id": 1,
//     "nombre": "Juan Pérez",
//     "document_id": "123456789",
//     "estado_civil": "Soltero",
//     "residencia": "Bogotá",
//     "telefono_residencia": "6011234567"
// },
// "formaciones": [
// { "tipo": "Primaria", "institucion": "Colegio ABC" },
// { "tipo": "Universitaria", "institucion": "Universidad XYZ" }
// ],
// "experiencias": [
// { "nombre_empresa": "Empresa 1", "cargo": "Asistente", "direccion": "Calle 123", "telefono": "6011111111" }
// ],
// "idiomas": [
// { "idioma": "Inglés", "lectura": 4, "escritura": 3, "habla": 5 }
// ],
// "herramientas": [
// { "herramienta": "Word", "tipo": "Ofimática", "nivel": 5 },
// { "herramienta": "Photoshop", "tipo": "Otra", "nivel": 3 }
// ],
// "referencias": [
// { "tipo": "Profesional", "nombre": "Carlos López", "telefono": "6012223333", "relacion": "Jefe anterior" }
// ]
// }

//          */
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// export const updateCurriculum = async (id, data) => {
//     try {
//         const { curriculum_id, estado_civil, residencia, telefono_residencia, formaciones, experiencias, idiomas, herramientas, referencias } = req.body;

//         // 1. Actualizar currículum
//         await connection.query(`
//           UPDATE curriculums
//           SET estado_civil = ?, residencia = ?, telefono_residencia = ?
//           WHERE id = ?
//         `, [estado_civil, residencia, telefono_residencia, curriculum_id]);

//         // 2. Eliminar registros existentes (formaciones, experiencias, idiomas, etc.)
//         await connection.query(`DELETE FROM formaciones WHERE curriculum_id = ?`, [curriculum_id]);
//         await connection.query(`DELETE FROM experiencias_laborales WHERE curriculum_id = ?`, [curriculum_id]);
//         await connection.query(`DELETE FROM idiomas WHERE curriculum_id = ?`, [curriculum_id]);
//         await connection.query(`DELETE FROM herramientas_informaticas WHERE curriculum_id = ?`, [curriculum_id]);
//         await connection.query(`DELETE FROM referencias WHERE curriculum_id = ?`, [curriculum_id]);

//         // 3. Insertar nuevas formaciones
//         for (const formacion of formaciones) {
//             await connection.query(`
//             INSERT INTO formaciones (curriculum_id, tipo, institucion)
//             VALUES (?, ?, ?)
//           `, [curriculum_id, formacion.tipo, formacion.institucion]);
//         }

//         // 4. Insertar nuevas experiencias laborales
//         for (const experiencia of experiencias) {
//             await connection.query(`
//             INSERT INTO experiencias_laborales (curriculum_id, nombre_empresa, cargo, direccion, telefono)
//             VALUES (?, ?, ?, ?, ?)
//           `, [curriculum_id, experiencia.nombre_empresa, experiencia.cargo, experiencia.direccion, experiencia.telefono]);
//         }

//         // 5. Insertar nuevos idiomas
//         for (const idioma of idiomas) {
//             await connection.query(`
//             INSERT INTO idiomas (curriculum_id, idioma, lectura, escritura, habla)
//             VALUES (?, ?, ?, ?, ?)
//           `, [curriculum_id, idioma.idioma, idioma.lectura, idioma.escritura, idioma.habla]);
//         }

//         // 6. Insertar nuevas herramientas informáticas
//         for (const herramienta of herramientas) {
//             await connection.query(`
//             INSERT INTO herramientas_informaticas (curriculum_id, herramienta, tipo, nivel)
//             VALUES (?, ?, ?, ?)
//           `, [curriculum_id, herramienta.herramienta, herramienta.tipo, herramienta.nivel]);
//         }

//         // 7. Insertar nuevas referencias
//         for (const referencia of referencias) {
//             await connection.query(`
//             INSERT INTO referencias (curriculum_id, tipo, nombre, telefono, relacion)
//             VALUES (?, ?, ?, ?, ?)
//           `, [curriculum_id, referencia.tipo, referencia.nombre, referencia.telefono, referencia.relacion]);
//         }

//         await connection.commit();
//         res.status(200).json({ message: 'Currículum actualizado exitosamente.' });

//     } catch (error) {
//         console.error(error);
//         await connection.rollback();
//         res.status(500).json({ message: 'Error al actualizar el currículum.' });
//     }
// };