import { Inject } from "typedi";
import ConsumptionService from "../service/consumption.service";
import { Consumption } from "../entities/consumption.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { DeleteResult } from "typeorm";

@JsonController()
export class MenuController {

	@Inject()
	private consumptionService!: ConsumptionService;

	@Get("/menu")
	async getAll(): Promise<Consumption[]> {
		return await this.consumptionService.findAll();
	}

	@Get("/menu/:id")
	async getOne(@Param("id") id: number): Promise<Consumption> {
		return await this.consumptionService.find(id);
	}

	@Post("/menu")
	async post(@Body() consumption: Consumption): Promise<Consumption> {
		return await this.consumptionService.insert(consumption);
	}

	@Put("/menu/:id")
	async put(@Param("id") id: number, @Body() consumption: Consumption): Promise<Consumption> {
		consumption.id = id;
		return await this.consumptionService.update(id, consumption);
	}

	@Delete("/menu/:id")
	async remove(@Param("id") id: number): Promise<DeleteResult> {
		return await this.consumptionService.delete(id);
	}

}