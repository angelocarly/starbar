import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ConsumptionSeed } from "../seeds/consumption.seed";

export class seedConsumption1593698239384 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await getRepository("consumption").save(ConsumptionSeed);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
