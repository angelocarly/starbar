import { Inject } from "typedi";
import ConsumptionService from "../services/consumption.service";
import CategoryService from "../services/category.service";
import { Consumption } from "../models/entities/consumption.entity";
import {JsonController, Param, Body, Get, Post, Put, Delete, Authorized, OnUndefined} from "routing-controllers";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { Category } from "../models/entities/category.entity";
import MenuService from "../services/menu.service";
import { OrderDTO } from "../models/dto/order.dto";

@JsonController()
export class MenuController {

	@Inject()
	private consumptionService!: ConsumptionService;

	@Inject()
	private categoryService!: CategoryService;

	@Inject()
	private menuService!: MenuService;

	@Get("/menu")
	async getAll(): Promise<Category[]> {
		return await this.categoryService.getMenu();
	}

	@Get("/menu/:id")
	async getOne(@Param("id") id: number): Promise<Consumption> {
		return await this.consumptionService.find(id);
	}

	@OnUndefined(201)
	@Post("/order")
	async order(@Body() order: OrderDTO): Promise<string> {
		await this.menuService.order(order);
		return "ok";
	}

	@Authorized()
	@Post("/menu")
	async post(@Body() consumption: Consumption): Promise<InsertResult> {
		return await this.consumptionService.insert(consumption);
	}

	@Authorized()
	@Put("/menu/:id")
	async put(@Param("id") id: number, @Body() consumption: Consumption): Promise<UpdateResult> {
		return await this.consumptionService.update(id, { ...consumption, id });
	}

	@Authorized()
	@Delete("/menu/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.consumptionService.delete(id);
	}

}
