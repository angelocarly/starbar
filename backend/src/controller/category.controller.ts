import { Inject } from "typedi";
import CategoryService from "../service/category.service";
import { Category } from "../entities/category.entity";
import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { DeleteResult } from "typeorm";

@JsonController()
export class CategoryController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/category")
	async getAll(): Promise<Category[]> {
		return await this.categoryService.findAll();
	}

	@Get("/category/:id")
	async getOne(@Param("id") id: number): Promise<Category | undefined> {
		return await this.categoryService.find(id);
	}

	@Post("/category")
	async post(@Body() category: Category): Promise<Category> {
		return await this.categoryService.insert(category);
	}

	@Put("/category/:id")
	async put(@Param("id") id: number, @Body() category: Category): Promise<Category>{
		category.id = id;
		return await this.categoryService.update(id, category);
	}

	@Delete("/category/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.categoryService.delete(id);
	}

}