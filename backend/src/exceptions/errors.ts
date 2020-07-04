import { NotFoundError } from "routing-controllers";

interface CategoryNotFound {
    status: number,
    categoryId: number,
    message: string
}

export class CategoryNotFoundError extends NotFoundError {

    public categoryId: number;

    constructor(categoryId: number, message?: string) {
        super(message || `No category with id ${categoryId} found`);
        this.categoryId = categoryId;
        this.name = "CategoryNotFoundError";
    }

    json = (): CategoryNotFound => ({
        status: this.httpCode,
        categoryId: this.categoryId,
        message: this.message
    });
}

interface ConsumptionNotFound {
    status: number,
    consumptionId: number,
    message: string
}

export class ConsumptionNotFoundError extends NotFoundError {

    public consumptionId: number;

    constructor(consumptionId: number, message?: string) {
        super(message || `No consumption with id ${consumptionId} found`);
        this.consumptionId = consumptionId;
        this.name = "ConsumptionNotFoundError";
    }

    json = (): ConsumptionNotFound => ({
        status: this.httpCode,
        consumptionId: this.consumptionId,
        message: this.message
    });
}
