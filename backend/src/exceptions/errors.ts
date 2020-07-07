import { NotFoundError, UnauthorizedError } from "routing-controllers";
import { capitalize } from "../utils/stringUtils";

export class EntityNotFoundError extends NotFoundError {

    public entityId?: number;

    constructor(entityName: string, entityId?: number , message?: string) {
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

export class UserNotFoundError extends EntityNotFoundError {

    constructor(username?: string, id?: number, message?: string) {
    	super("user", id, username && `No user with username ${username} found`);
    }
}

export class UsernameTakenError extends UnauthorizedError {

    constructor(username: string, message?: string) {
        super(message || `Username ${username} already taken`);
        this.name = "UsernameTakenError";
    }
}

export class InvalidLoginError extends UnauthorizedError {

    constructor(username: string, message?: string) {
        super(message || `Authentication for user ${username} is not valid`);
        this.name = "InvalidLoginError";
    }
}
