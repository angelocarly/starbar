import {DeleteResult, getRepository, InsertResult} from "typeorm";
import {Category} from "../models/entities";
import {Service} from "typedi";
import {GenericRepository} from "./repository";
import {CategoryNotFoundError} from "../exceptions/errors";

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

	insert(category: Category): Promise<InsertResult> {
		return this.repository.insert(category);
	}

	update(id: number, category: Category): Promise<Category> {
		category.id = id;
		return this.repository.save(category);
	}

	findAllJoinConsumptions(): Promise<Category[]> {
		return this.repository.find( { relations: [ "consumptions" ] } );
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
