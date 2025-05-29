//& Users
export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "student";
}

export type Student = Omit<User, "id"> & {
    id?: number;
    identity_document: number;
    state: boolean;
    profile_photo: string;
}

export type Admin = Omit<User, "id"> & {
    id?: number;
}

// Documents
export type Document = {
    id: number;
    name: string;
    student_id: number;
    document_type: "arl" | "coverLetter";
    file_path: string;
}

export type Binnacle = {
    id: number;
    name: string;
    student_id: number;
    file_path: string;
}

export type Scenary = {
    id: number;
    student_id: number;
    name: string;
    address: string;
}




