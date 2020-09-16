import { DeleteResult, getRepository } from "typeorm";
import { Consumption } from "../models/entities";
import { Service } from "typedi";
import { GenericRepository } from "./repository";
import { ConsumptionNotFoundError } from "../exceptions/errors";

@Service()
export class ConsumptionRepository implements GenericRepository<Consumption> {

	repository = getRepository(Consumption);

	async find(id: number): Promise<Consumption> {
		const consumption = await this.repository.findOne(id);
		if (!consumption) {
		    throw new ConsumptionNotFoundError(id);
		}
		return consumption;
	}

	findAll(): Promise<Consumption[]> {
		return this.repository.find({ relations:["category"] });
	}

	async insert(consumption: Consumption): Promise<number> {
		const result = await this.repository.insert(consumption);
		return result.raw;
	}

	update(id: number, consumption: Consumption): Promise<Consumption> {
		return this.repository.save({ ...consumption, id });
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}
}
