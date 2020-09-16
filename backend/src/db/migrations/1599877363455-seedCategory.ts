import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { CategorySeed } from "../seeds/category.seed";

export class seedCategory1599877363455 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await getRepository("category").save(CategorySeed);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
