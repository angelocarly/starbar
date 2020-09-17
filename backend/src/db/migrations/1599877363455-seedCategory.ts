import { getRepository, MigrationInterface } from "typeorm";
import { CategorySeed } from "../seeds/category.seed";

export class seedCategory1599877363455 implements MigrationInterface {

	public async up(): Promise<void> {
		await getRepository("category").save(CategorySeed);
	}

	public async down(): Promise<void> {
		return Promise.resolve(undefined);
	}

}
