import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Consumption } from "../models/entities";
import { DeleteResult } from "typeorm";
import { Inject } from "typedi";
import ConsumptionService from "../services/consumption.service";
import { ConsumptionResponse } from "../models/response/consumption.response";
import { CreateConsumptionRequest } from "../models/requests/create-consumption.request";

@JsonController()
export class ConsumptionController {

    @Inject()
    private consumptionService!: ConsumptionService;

    @Get("/consumptions/:id")
    getOne(@Param("id") id: number): Promise<Consumption> {
    	return this.consumptionService.find(id);
    }

    @Authorized()
    @Post("/consumptions")
    async post(@Body() consumption: CreateConsumptionRequest): Promise<ConsumptionResponse> {

    	return {
    		id: await this.consumptionService.insert({
    			name: consumption.name!,
    			price: consumption.price!,
    			category: { id: consumption.categoryId }
    		}),
    		name: consumption.name!,
    		price: consumption.price!
    	};
    }

    @Authorized()
    @Put("/consumptions/:id")
    put(@Param("id") id: number, @Body() consumption: Consumption): Promise<Consumption> {
    	return this.consumptionService.update(id, consumption);
    }

    @Authorized()
    @Delete("/consumptions/:id")
    remove(@Param("id") id: number): Promise<DeleteResult> {
    	return this.consumptionService.delete(id);
    }
}
