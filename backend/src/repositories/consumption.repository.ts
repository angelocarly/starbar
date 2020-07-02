import { getManager } from "typeorm"
import {Consumption} from "../entities/consumption"

export class ConsumptionRepository {
	
	async getAllWithCategories():Promise<Consumption[]> {
		return getManager().getRepository(Consumption).find({relations:["category"]})
	}

} 
