import { getRepository, DeleteResult, UpdateResult, InsertResult } from "typeorm";
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

	insert(consumption: Consumption): Promise<InsertResult> {
		return this.repository.insert(consumption);
	}

	update(id: number, consumption: Consumption): Promise<UpdateResult> {
		return this.repository.update(id, consumption);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
