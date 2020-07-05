import { getRepository, DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { Category } from "../entities/category.entity";
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

	insert(category: Category): Promise<InsertResult> {
		return this.repository.insert(category);
	}

	update(id: number, category: Category): Promise<UpdateResult> {
		return this.repository.update(id, category);
	}

	findAllJoinConsumptions(): Promise<Category[]> {
		return this.repository.find( { relations: [ "consumptions" ] } );
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
