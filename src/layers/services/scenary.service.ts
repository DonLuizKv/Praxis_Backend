import { verifyField } from "../repositories/generic.model";
import { Scenary } from "../../utilities/Types";
import { ScenaryRepository } from "../repositories/scenary.repository";

const ScenaryRepo = new ScenaryRepository();

//& CREATE
export const createScenary = async (scenary: Scenary) => {

    const errors = {
        name: "This name is already in use",
    }

    for (const field of Object.keys(errors)) {
        const value = scenary[field as keyof Scenary];
        const existInDB = await verifyField("scenary", field, value);
        if (existInDB) {
            throw new Error(errors[field as keyof typeof errors]);
        }
    }

    const result = await ScenaryRepo.Insert(scenary);
    return result;
};

//$ GET ALL
export const getScenarys = async () => {
    const errors = {
        notFound: "Scenarys not found",
    }

    const scenarys = await ScenaryRepo.FindAll();

    if (scenarys.length === 0) {
        throw new Error(errors.notFound);
    }

    return scenarys;
};  

//$ GET BY ID
export const getScenary = async (id: number) => {
    const errors = {
        notFound: "Scenary not found",
    }

    const scenary = await ScenaryRepo.Find(id);

    if (scenary == null) {
        throw new Error(errors.notFound);
    }

    return scenary;
};

//# UPDATE
export const updateScenary = async (id: number, updatedScenary: Scenary) => {
    const errors = {
        notFound: "Scenary not found",
        name: "This name is already in use",
    }

    if (!updatedScenary) throw new Error("At least one field must be updated");

    const scenary = await ScenaryRepo.Find(id);
    if (scenary == null) throw new Error(errors.notFound);

    for (const field of Object.keys(errors)) {
        const value = updatedScenary[field as keyof Scenary];
        const existInDB = await verifyField("scenary", field, value);
        if (existInDB) throw new Error(errors[field as keyof typeof errors]);
    }
    
    const result = await ScenaryRepo.Update(id, updatedScenary);
    return result;  
};

//! DELETE
export const deleteScenary = async (id: number) => {
    const errors = {
        notFound: "Scenary not found",
    }

    const scenary = await ScenaryRepo.Find(id);

    if (scenary == null) {
        throw new Error(errors.notFound);
    }

    const result = await ScenaryRepo.Delete(id);
    return result;
};

