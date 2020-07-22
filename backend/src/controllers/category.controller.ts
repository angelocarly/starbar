import {Inject} from "typedi";
import CategoryService from "../services/category.service";
import {Category} from "../models/entities";
import {Authorized, Body, Delete, Get, JsonController, Param, Post, Put} from "routing-controllers";
import {DeleteResult, InsertResult} from "typeorm";

@JsonController()
export class CategoryController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/categories")
	async getAll(): Promise<Category[]> {
		return await this.categoryService.findAll();
	}

	@Get("/categories/:id")
	async getOne(@Param("id") id: number): Promise<Category> {
		return await this.categoryService.find(id);
	}

	@Authorized()
	@Post("/categories")
	async post(@Body() category: Category): Promise<InsertResult> {
		return await this.categoryService.insert(category);
	}

	@Authorized()
	@Put("/categories/:id")
	async put(@Param("id") id: number, @Body() category: Category): Promise<Category> {
		category.id = id;
		return await this.categoryService.update(id, category);
	}

	@Authorized()
	@Delete("/categories/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.categoryService.delete(id);
	}
}
