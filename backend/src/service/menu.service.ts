import { Inject, Service } from "typedi";
import { OrderDTO } from "../dto/order.dto";
import TicketService from "./ticket.service";

@Service()
export default class MenuService {

	@Inject()
	public ticketService!: TicketService;

	async order(order: OrderDTO): Promise<string> {
		this.ticketService.print(order.name);
		return "AAAA";

	}
}