import { Inject } from "typedi";
import CategoryService from "../services/category.service";
import { Category } from "../models/entities";
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { DeleteResult } from "typeorm";
import { CategoryResponse } from "../models/response/category.response";
import { CreateCategoryRequest } from "../models/requests/create-category.request";

@JsonController()
export class CategoryController {

	@Inject()
	private categoryService!: CategoryService;

	@Get("/categories")
	getAll(): Promise<Category[]> {
		return this.categoryService.findAll();
	}

	@Get("/categories/:id")
	getOne(@Param("id") id: number): Promise<Category> {
		return this.categoryService.find(id);
	}

	@Authorized()
	@Post("/categories")
	async post(@Body() category: CreateCategoryRequest): Promise<CategoryResponse> {
		return {
			id: await this.categoryService.insert({ name: category.name }),
			name: category.name!,
		};
	}

	@Authorized()
	@Put("/categories/:id")
	put(@Param("id") id: number, @Body() category: Category): Promise<Category> {
		return this.categoryService.update(id, category);
	}

	@Authorized()
	@Delete("/categories/:id")
	remove(@Param("id") id: number): Promise<DeleteResult> {
		return this.categoryService.delete(id);
	}
}
