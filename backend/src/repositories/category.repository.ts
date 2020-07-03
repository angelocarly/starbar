import { getRepository, DeleteResult } from "typeorm";
import { Category } from "../entities/category.entity";
import { Service } from "typedi";
import { Repository } from "./repository";


@Service()
export class CategoryRepository implements Repository<Category> {

	repository = getRepository(Category);

	find(id: number): Promise<Category | undefined> {
		return this.repository.findOne(id);
	}

	findAll(): Promise<Category[]> {
		return this.repository.find();
	}

	insert(consumption: Category): Promise<Category> {
		return this.repository.save(consumption);
	}

	update(id: number, consumption: Category): Promise<Category> {
		consumption.id = id;
		return this.repository.save(consumption);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
