import { Inject } from "typedi";
import CategoryService from "../services/category.service";
import { Category } from "../models/entities/category.entity";
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

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
	async put(@Param("id") id: number, @Body() category: Category): Promise<UpdateResult> {
		return await this.categoryService.update(id, { ...category, id });
	}

	@Authorized()
	@Delete("/categories/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.categoryService.delete(id);
	}
}
