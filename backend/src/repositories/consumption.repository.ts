import { getRepository, DeleteResult, UpdateResult, InsertResult } from "typeorm";
import { Consumption } from "../entities/consumption.entity";
import { Service } from "typedi";
import { GenericRepository } from "./repository";


@Service()
export class ConsumptionRepository implements GenericRepository<Consumption> {

	repository = getRepository(Consumption);

	find(id: number): Promise<Consumption | undefined> {
		return this.repository.findOne(id);
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
