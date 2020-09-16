import { DeleteResult, getRepository } from "typeorm";
import { Category } from "../models/entities";
import { Service } from "typedi";
import { GenericRepository } from "./repository";
import { CategoryNotFoundError } from "../exceptions/errors";

@Service()
export class CategoryRepository implements GenericRepository<Category> {

	repository = getRepository(Category);

	async find(id: number): Promise<Category> {
		const category = await this.repository.findOne(id);
		if (!category) {
			throw new CategoryNotFoundError(id);
		}
		return category;
	}

	findAll(): Promise<Category[]> {
		return this.repository.find();
	}

	async insert(category: Category): Promise<number> {
		const result = await this.repository.insert(category);
		return result.raw;
	}

	update(id: number, category: Category): Promise<Category> {
		return this.repository.save({ ...category, id });
	}

	findAllJoinConsumptions(): Promise<Category[]> {
		return this.repository.find( { relations: [ "consumptions" ] } );
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}
}
