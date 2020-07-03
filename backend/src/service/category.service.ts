import { Category } from "../entities/category.entity";
import { Service, Container, Inject } from "typedi";
import { CategoryRepository } from "../repositories/category.repository";
import { GenericService } from "./service";
import { DeleteResult } from "typeorm";

@Service()
export default class CategoryService implements GenericService<Category> {

	@Inject()
	public repository!: CategoryRepository;

	find(id: number): Promise<Category | undefined> {
		return this.repository.find(id);
	}

	findAll(): Promise<Category[]> {
		return this.repository.findAll();
	}

	insert(c: Category): Promise<Category> {
		return this.repository.insert(c);
	}

	update(id: number, c: Category): Promise<Category> {
		c.id = id;
		return this.repository.update(c);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

}