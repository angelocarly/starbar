import { NotFoundError } from "routing-controllers";
import { capitalize } from "../utils/stringUtils";

export class EntityNotFoundError extends NotFoundError {

    public entityId: number;

    constructor(entityName: string, entityId: number, message?: string) {
        super(message || `No ${entityName} with id ${entityId} found`);
        this.entityId = entityId;
        this.name = `${capitalize(entityName)}${this.constructor.name}`;
    }
}

export class CategoryNotFoundError extends EntityNotFoundError {

    constructor(categoryId: number, message?: string) {
        super("category", categoryId, message);
    }
}

export class ConsumptionNotFoundError extends EntityNotFoundError {

    constructor(consumptionId: number, message?: string) {
        super("consumption", consumptionId, message);
    }
}
