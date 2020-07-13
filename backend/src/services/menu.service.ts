import { Inject, Service } from "typedi";
import { OrderDTO } from "../models/dto/order.dto";
import { TicketService } from "./ticket.service";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { Ticket, TicketEntry } from "../models/entities/ticket.entity";
import { ConsumptionNotFoundError } from "../exceptions/errors";

@Service()
export default class MenuService {

	@Inject("ticket.service")
	public ticketService!: TicketService;

	@Inject()
	public consumptionRepository!: ConsumptionRepository;

	async order(order: OrderDTO): Promise<void> {
		const ticket = await this.toTicket(order);
		this.ticketService.print(ticket);
	}

	async toTicket(orderDto: OrderDTO): Promise<Ticket> {

		const consumptions = await this.consumptionRepository.findAll();

		// map each order id to a Consumption object
		const entries: TicketEntry[] = orderDto.orders.map((orderDto) => {
			const consumption = consumptions.find((c) => c.id === orderDto.id);
			if (!consumption) {
				throw new ConsumptionNotFoundError(orderDto.id);
			}

			return {
				consumption: consumption,
				amount: orderDto.amount
			};
		});

		return new Ticket(orderDto.table, orderDto.name, entries);
	}

}
