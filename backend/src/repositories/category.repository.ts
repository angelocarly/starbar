import { getRepository, DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { Category } from "../entities/category.entity";
import { Service } from "typedi";
import { GenericRepository } from "./repository";


@Service()
export class CategoryRepository implements GenericRepository<Category> {

	repository = getRepository(Category);

	find(id: number): Promise<Category | undefined> {
		return this.repository.findOne(id);
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

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
