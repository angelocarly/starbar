import { Inject } from "typedi";
import CategoryService from "../service/category.service";
import { Category } from "../entities/category.entity";
import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";

@JsonController()
export class CategoryController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/categories")
	async getAll() {
		return await this.categoryService.findAll();
	}

	@Get("/categories/:id")
	async getOne(@Param("id") id: number) {
		return await this.categoryService.find(id);
	}

	@Post("/categories")
	async post(@Body() category: Category) {
		return await this.categoryService.insert(category);
	}

	@Put("/categories/:id")
	async put(@Param("id") id: number, @Body() category: Category) {
		category.id = id;
		return await this.categoryService.update(id, category);
	}

	@Delete("/categories/:id")
	async remove(@Param("id") id: number) {
		return await this.categoryService.delete(id);
	}

}