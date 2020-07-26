import { Inject } from "typedi";
import CategoryService from "../services/category.service";
import { Category } from "../models/entities";
import { Get, JsonController } from "routing-controllers";

@JsonController()
export class MenuController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/menu")
	async getAll(): Promise<Category[]> {
		return await this.categoryService.getMenu();
	}
}
