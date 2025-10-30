import { Scenary } from "../../utilities/Types";
import { Repository } from "./Repository";

export class ScenaryRepository extends Repository<Scenary> {
    constructor() {
        super("scenary")
    }
}