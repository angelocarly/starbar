import {Inject} from "typedi";
import ConsumptionService from "../services/consumption.service";
import CategoryService from "../services/category.service";
import {Category, Consumption} from "../models/entities";
import {Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {DeleteResult, InsertResult} from "typeorm";
import MenuService from "../services/menu.service";
import {OrderDTO} from "../models/dto/order.dto";

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

	@Post("/order")
	@OnUndefined(204)
	async order(@Body() order: OrderDTO): Promise<void> {
		return await this.menuService.order(order);
	}

	@Authorized()
	@Post("/menu")
	async post(@Body() consumption: Consumption): Promise<InsertResult> {
		return await this.consumptionService.insert(consumption);
	}

	@Authorized()
	@Put("/menu/:id")
	async put(@Param("id") id: number, @Body() consumption: Consumption): Promise<Consumption> {
		return await this.consumptionService.update(id, { ...consumption, id });
	}

	@Authorized()
	@Delete("/menu/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.consumptionService.delete(id);
	}

}
