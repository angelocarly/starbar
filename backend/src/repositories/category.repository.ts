import { getRepository, DeleteResult } from "typeorm";
import { Category } from "../entities/category.entity";
import { Service } from "typedi";
import { Repository } from "./repository";
import { CategoryNotFoundError } from "../exceptions/errors";


@Service()
export class CategoryRepository implements Repository<Category> {

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
