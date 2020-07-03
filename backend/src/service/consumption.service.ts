import { Consumption } from "../entities/consumption.entity";
import { Inject, Service } from "typedi";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { GenericService } from "./service";
import { DeleteResult } from "typeorm";

@Service()
export default class ConsumptionService implements GenericService<Consumption> {

	@Inject()
	public repository!: ConsumptionRepository;

	find(id: number): Promise<Consumption | undefined> {
		return this.repository.find(id);
	}

	findAll(): Promise<Consumption[]> {
		return this.repository.findAll();
	}

	insert(c: Consumption): Promise<Consumption> {
		return this.repository.insert(c);
	}

	update(id: number, c: Consumption): Promise<Consumption> {
		c.id = id;
		return this.repository.update(c);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}