import DB from "../utilities/database.js";

//? Metodos que administran, modifican y configuran
//? la informacion (chef).

//* SELECT -> [rows] array de objectos (registros)
//* INSERT -> [result] objeto con info de la operacion (insertID, affectedRows) 
//* UPDATE -> [result] objeto con info de la operacion (changedRows, info)

// Post
async function createStudent(name, email, password) {
    // const query = "";
    // const [result] = await DB.execute(query, [name, email, password]);
    // return result;
    const a = {
        name:name,
        email:email,
        pass:password
    }
    return a;
}

async function uploadArchive(archive, pointer) {
    const querys = {
        "arl": "INSERT INTO archive VALUES(?)",
        "coverLetter": "INSERT INTO archive VALUES(?)",
    }
    const [result] = await DB.execute(querys[pointer], [archive]);
    return result;
}

// Get
async function getAllStudents() {
    // const query = "";
    // const [rows] = await DB.execute(query);
    const list = ["pipe","ñoqasd","asdasd","asdasdas"];
    return list;
}


// Delete


// Put

export default {
    createStudent,
    getAllStudents,
}