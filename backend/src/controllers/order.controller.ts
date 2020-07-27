import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import { OrderDTO } from "../models/dto/order.dto";
import { Inject } from "typedi";
import OrderService from "../services/order.service";

@JsonController()
export class OrderController {

	@Inject()
	private orderService!: OrderService;

	@Post("/order")
	@OnUndefined(204)
	async order(@Body() order: OrderDTO): Promise<void> {
		return await this.orderService.order(order);
	}
}
