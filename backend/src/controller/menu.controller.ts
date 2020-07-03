import { Inject, Service } from "typedi";
import ConsumptionServiceImpl from "../service/consumption.service";
import { Application, Request, Response } from "express";

@Service()
export class MenuController {

	@Inject()
	private consumptionService!: ConsumptionServiceImpl;

	public register(app: Application): void {

		app.get("/", async (req: Request, res: Response) => {

			// const consumptions = await this.consumptionService.findAll();
			//
			// res.send(consumptions);

			res.send("test");

		});

	}


}