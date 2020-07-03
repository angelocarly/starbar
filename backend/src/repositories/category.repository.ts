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

	insert(category: Category): Promise<Category> {
		return this.repository.save(category);
	}

	update(category: Category): Promise<Category> {
		return this.repository.save(category);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}
