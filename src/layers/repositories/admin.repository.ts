import { Admin } from "../../utilities/Types";
import { Repository } from "./Repository";

export class AdminRepository extends Repository<Admin> {
    constructor (){
        super("admins")
    }
}