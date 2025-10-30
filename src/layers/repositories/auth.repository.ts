import { Database } from "../../utilities/Database";
import { Student, User } from "../../utilities/Types";

const connection = Database.getInstance()

export const GetAdmin = async (email: string) => {
    const query = "SELECT * FROM admins WHERE email = $1";
    const { rows } = await connection.query(query, [email]);
    return rows[0];
}

export const GetStudent = async (email: string) => {
    const query = "SELECT * FROM students WHERE email = $1";
    const { rows } = await connection.query(query, [email]);
    return rows[0];
}

export const GenerateStudent = async (student: Student) => {
    const query = "INSERT INTO students (name, email, password, identity_document, profile_photo) VALUES (?, ?, ?, ?, ?)";
    await connection.query(query, [
        student.name,
        student.email,
        student.password,
        student.identity_document,
        student.profile_photo
    ]);
}

export const GenerateAdmin = async (admin: User) => {
    const query = "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)";
    await connection.query(query, [admin.name, admin.email, admin.password, admin.role]);
}
