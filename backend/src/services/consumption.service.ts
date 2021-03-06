import { Consumption } from "../models/entities";
import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { DeleteResult } from "typeorm";

@Service()
export default class ConsumptionService {

	@Inject()
	public repository!: ConsumptionRepository;

	find(id: number): Promise<Consumption> {
		return this.repository.find(id);
	}

	findAll(): Promise<Consumption[]> {
		return this.repository.findAll();
	}

	insert(consumption: Consumption): Promise<number> {
		return this.repository.insert(consumption);
	}

	update(id: number, consumption: Consumption): Promise<Consumption> {
		return this.repository.update(id, consumption);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}
}
