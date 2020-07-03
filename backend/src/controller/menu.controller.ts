import { Inject } from "typedi";
import ConsumptionServiceImpl from "../service/consumption.service";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class MenuController {

	@Inject()
	private consumptionService!: ConsumptionServiceImpl;

	@Get("/menu")
	async getAll() {
		return await this.consumptionService.findAll();
	}

	@Get("/menu/:id")
	async getOne(@Param("id") id: number) {
		return await this.consumptionService.find(id);
	}

	@Post("/menu")
	post(@Body() user: any) {
		// TODO add post
		return "Saving user...";
	}

	@Put("/menu/:id")
	put(@Param("id") id: number, @Body() user: any) {
		// TODO add put
		return "Updating a user...";
	}

	@Delete("/menu/:id")
	remove(@Param("id") id: number) {
		// TODO add delete
		return "Removing user...";
	}

}