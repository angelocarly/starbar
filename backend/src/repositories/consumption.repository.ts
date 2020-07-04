import { getRepository, DeleteResult } from "typeorm";
import { Consumption } from "../entities/consumption.entity";
import { Service } from "typedi";
import { Repository } from "./repository";
import { ConsumptionNotFoundError } from "../exceptions/errors";


@Service()
export class ConsumptionRepository implements Repository<Consumption> {

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

	insert(consumption: Consumption): Promise<Consumption> {
		return this.repository.save(consumption);
	}

	update(consumption: Consumption): Promise<Consumption> {
		return this.repository.save(consumption);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
