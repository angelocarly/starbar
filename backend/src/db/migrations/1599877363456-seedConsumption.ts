import { getRepository, MigrationInterface } from "typeorm";
import { ConsumptionSeed } from "../seeds/consumption.seed";

export class seedConsumption1599877363456 implements MigrationInterface {

	public async up(): Promise<void> {
		await getRepository("consumption").save(ConsumptionSeed);
	}

	public async down(): Promise<void> {
		return Promise.resolve(undefined);
	}

}
