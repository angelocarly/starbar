import { Inject } from "typedi";
import CategoryService from "../service/category.service";
import { Category } from "../entities/category.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@JsonController()
export class CategoryController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/category")
	async getAll() {
		return await this.categoryService.findAll();
	}

	@Get("/category/:id")
	async getOne(@Param("id") id: number) {
		return await this.categoryService.find(id);
	}

	@Post("/category")
	async post(@Body() category: Category) {
		return await this.categoryService.insert(category);
	}

	@Put("/category/:id")
	async put(@Param("id") id: number, @Body() category: Category) {
		category.id = id;
		return await this.categoryService.update(id, category);
	}

	@Delete("/category/:id")
	async remove(@Param("id") id: number) {
		return await this.categoryService.delete(id);
	}

}