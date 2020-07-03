import { getRepository, DeleteResult } from "typeorm";
import { Consumption } from "../entities/consumption.entity";
import { Service } from "typedi";
import { Repository } from "./repository";


@Service()
export class ConsumptionRepository implements Repository<Consumption> {

	repository = getRepository(Consumption);

	find(id: number): Promise<Consumption | undefined> {
		return this.repository.findOne(id);
	}

	findAll(): Promise<Consumption[]> {
		return this.repository.find({ relations:["category"] });
	}

	insert(consumption: Consumption): Promise<Consumption> {
		return this.repository.save(consumption);
	}

	update(id: number, consumption: Consumption): Promise<Consumption> {
		return this.repository.update(id, consumption).then((res) => {
			return this.repository.findOneOrFail(id);
		});
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
